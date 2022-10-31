import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

function ProductsCard({ products }) {
  const { name, price, urlImage, id } = products;
  const [qtd, setQtd] = useState(0);

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
              { price }
            </span>
            <img
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
              style={ { width: '200px' } }
            />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ () => {
                if (qtd > 0) setQtd(qtd - 1);
              } }
            >
              -
            </button>
            <label htmlFor="email">
              <input
                name="qtd"
                value={ qtd }
                type="number"
                onChange={ ({ target: { value } }) => setQtd(Number(value)) }
                data-testid={ `customer_products__input-card-quantity-${id}` }
              />
            </label>
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${id}` }
              onClick={ () => setQtd(qtd + 1) }
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
