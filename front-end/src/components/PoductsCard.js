import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import DeliveryContext from '../provider/DeliveryContext';

// import { Link } from 'react-router-dom';

function ProductsCard({ products }) {
  const { name, price, urlImage, id } = products;
  const [qtd, setQtd] = useState(0);
  const totalSum = () => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(price));
    }
    const sum = sumLocal + Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
  };

  const totalSumSub = () => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(price));
    }
    const sum = sumLocal - Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
  };

  const totalSumInput = (value) => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(Number(price) * Number(value)));
    }
    const sum = sumLocal + Number(price) * Number(value);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
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
                if (qtd > 0) { setQtd(qtd - 1); totalSumSub(); }
              } }
            >
              -
            </button>
            <label htmlFor="email">
              <input
                name="qtd"
                value={ qtd }
                type="number"
                onChange={ ({ target: { value } }) => {
                  setQtd(Number(value));
                  totalSumInput(value);
                } }
                data-testid={ `customer_products__input-card-quantity-${id}` }
              />
            </label>
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => { setQtd(qtd + 1); totalSum(); } }
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
