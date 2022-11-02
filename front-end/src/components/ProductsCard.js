import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../provider/DeliveryContext';

function ProductsCard({ products }) {
  const { setTotalPrice } = useContext(DeliveryContext);
  const { name, price, urlImage, id } = products;
  const [qtd, setQtd] = useState(0);

  const totalSum = () => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(price));
      setTotalPrice(price);
    }
    const sum = sumLocal + Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
    setTotalPrice(sum);
  };

  const totalSumSub = () => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    const sum = sumLocal - Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
    setTotalPrice(sum);
  };

  const totalSumInput = (value, nameInput) => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal || nameInput === name) {
      localStorage.setItem('totalPrice', JSON.stringify(Number(price) * Number(value)));
      setTotalPrice(Number(price) * Number(value));
      return 0;
    }
    const sum = sumLocal + Number(price) * Number(value);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
    setTotalPrice(sum);
  };

  const saveItensCart = (value, nameInput) => {
    const itens = JSON.parse(localStorage.getItem('productsCart'));
    const saveObj = {
      ...itens,
      [nameInput]: {
        quantity: Number(value),
        price: Number(price),
        total: Number(price) * Number(value),
      },
    };
    localStorage.setItem('productsCart', JSON.stringify(saveObj));
  };

  const saveItensCartSum = (nameInput) => {
    const itens = JSON.parse(localStorage.getItem('productsCart'));
    const saveObj = {
      ...itens,
      [nameInput]: {
        quantity: qtd + 1,
        price: Number(price),
        total: Number(price) * (qtd + 1),
      },
    };
    localStorage.setItem('productsCart', JSON.stringify(saveObj));
  };

  const saveItensCartSub = (nameInput) => {
    const itens = JSON.parse(localStorage.getItem('productsCart'));
    const saveObj = {
      ...itens,
      [nameInput]: {
        quantity: qtd - 1,
        price: Number(price),
        total: Number(price) * (qtd - 1),
      },
    };
    localStorage.setItem('productsCart', JSON.stringify(saveObj));
  };

  return (
    <div>
      { !products ? <h1>Loading...</h1>
        : (
          <main>
            <span
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              { name }
            </span>
            <span
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              { price.replace('.', ',') }
            </span>
            <img
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
              style={ { width: '100px' } }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => {
                if (qtd > 0) {
                  setQtd(qtd - 1); totalSumSub();
                  saveItensCartSub({ target: { name: nameInput } });
                }
              } }
            >
              -
            </button>
            <label htmlFor={ name }>
              <input
                name={ name }
                value={ qtd }
                type="number"
                onChange={ ({ target: { value, name: nameInput } }) => {
                  setQtd(Number(value));
                  totalSumInput(value, nameInput);
                  saveItensCart(value, nameInput);
                } }
                data-testid={ `customer_products__input-card-quantity-${id}` }
              />
            </label>
            <button
              type="button"
              name={ name }
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ ({ target: { name: nameInput } }) => {
                setQtd(qtd + 1); totalSum(); saveItensCartSum(nameInput);
              } }
            >
              +
            </button>
          </main>
        )}
    </div>
  );
}

ProductsCard.propTypes = {
  products: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};

export default ProductsCard;
