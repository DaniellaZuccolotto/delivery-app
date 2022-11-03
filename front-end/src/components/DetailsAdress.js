import React, { useContext } from 'react';
import DeliveryContext from '../provider/DeliveryContext';

function DetailsAdress() {
  const { sale, setSale } = useContext(DeliveryContext);
  // const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = ({ target: { value, name } }) => {
    setSale((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const findSeller = ({ target: { value } }) => {
    console.log(value);
  };

  return (
    <div>
      <label htmlFor="sellerId">
        P.Vendedora Responsável:
        <select
          name="sellerId"
          data-testid="customer_checkout__select-seller"
          onChange={ findSeller }
          value="Fulana"
        >
          <option value="Fulana">Fulana</option>
          <option value="Fulana2">Fulana</option>
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
        // disabled={ !disabledBtn() }
        // onClick={ handleClick }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default DetailsAdress;
