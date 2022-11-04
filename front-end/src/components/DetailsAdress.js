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
    <div>
      <label htmlFor="sellerId">
        P.Vendedora Responsável:
        <select
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
      <label htmlFor="deliveryAddress">
        Endereço:
        <input
          name="deliveryAddress"
          value={ sale.deliveryAddress }
          onChange={ handleChange }
          type="text"
          placeholder="Digite seu endereço"
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="deliveryNumber">
        Número:
        <input
          name="deliveryNumber"
          value={ sale.deliveryNumber }
          onChange={ handleChange }
          type="number"
          placeholder=" Número"
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
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
