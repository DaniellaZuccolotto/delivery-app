import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestSeller, { createSale } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';

function DetailsAdress() {
  const { sale, setSale, saleProducts, setSaleProducts } = useContext(DeliveryContext);
  const [sellers, setSellers] = useState([]);
  const history = useNavigate();

  const setUserTotal = () => {
    const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
    const productsValues = Object.values(Object.values(productsCartLocal[0]));
    const total = productsValues.reduce((acc, curr) => acc + curr.total, 0);
    const arrayProductId = productsValues.map((product) => product.id);
    const arrayQuantity = productsValues.map((product) => product.quantity);
    const user = JSON.parse(localStorage.getItem('user'));
    setSale({ ...sale, totalPrice: total, userId: user.id });
    setSaleProducts({ ...saleProducts,
      productId: arrayProductId,
      quantity: arrayQuantity });
  };

  const handleChange = ({ target: { value, name } }) => {
    setSale((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const findSeller = async () => {
    try {
      const seller = await requestSeller();
      setSellers(seller);
      localStorage.setItem('vendedor', JSON.stringify(seller));
      return seller;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findSeller();
    setUserTotal();
  }, []);

  const onChangeSeller = ({ target: { value } }) => {
    setSale((prevState) => ({
      ...prevState,
      sellerId: Number(value),
    }));
  };

  const finishSale = async () => {
    const bodyProducts = {
      productId: saleProducts.productId,
      quantity: saleProducts.quantity,
    };
    const { orders } = await createSale(bodyProducts, sale);
    history(`/customer/orders/${orders.id}`);
  };

  return (
    <div
      className={ `flex flex-col items-center bg-[#e8e8e7] border-[1px] border-[#cccaca]
        shadow-lg shadow-slate-300 w-[60rem] h-48` }
    >
      <label
        className="text-center border-[1px] w-[28rem] mt-2 pt-2 h-10
        border-[#cccaca] shadow-md shadow-slate-300"
        htmlFor="sellerId"
      >
        P.Vendedora Responsável:
        <select
          className="ml-5 w-40 text-center border-[1px] border-black"
          name="sellerId"
          data-testid="customer_checkout__select-seller"
          onChange={ onChangeSeller }
          value={ sale.sellerId }
        >
          { sellers.map((seller) => (
            <option key={ seller.id } value={ seller.id }>
              { seller.name }
            </option>
          )) }
        </select>
      </label>
      <label
        className="text-center border-[1px] w-[28rem] mt-2 pt-2 h-10
          border-[#cccaca] shadow-md shadow-slate-300"
        htmlFor="deliveryAddress"
      >
        Endereço:
        <input
          className="ml-5 w-60 text-center border-[1px]
            border-[#cccaca] shadow-md shadow-slate-300"
          name="deliveryAddress"
          value={ sale.deliveryAddress }
          onChange={ handleChange }
          type="text"
          placeholder="Digite seu endereço"
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label
        className="text-center border-[1px] w-[28rem] mt-2 pt-1 h-10
         border-[#cccaca] shadow-md shadow-slate-300"
        htmlFor="deliveryNumber"
      >
        Número:
        <input
          className="ml-7 w-60 text-center border-[1px]
          border-[#cccaca] shadow-md shadow-slate-300"
          name="deliveryNumber"
          value={ sale.deliveryNumber }
          onChange={ handleChange }
          type="number"
          placeholder=" Número"
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
        className="self-center text-center border-[3px] bg-[#edbe47]
        border-[#cccaca] hover:bg-[#a37b15] shadow-md
        shadow-slate-300 mt-2 w-40 h-9 text-md"
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ finishSale }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default DetailsAdress;
