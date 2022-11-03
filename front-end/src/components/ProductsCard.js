import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../provider/DeliveryContext';

function ProductsCard({ products }) {
  const { setTotalPrice } = useContext(DeliveryContext);
  const { name, price, urlImage, id } = products;
  const [qtd, setQtd] = useState(0);

  const totalSum = () => {
    const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
    const productsValues = Object.values(Object.values(productsCartLocal[0]));
    const total = productsValues.reduce((acc, curr) => acc + curr.total, 0);
    setTotalPrice(total);
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
    totalSum();
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
    totalSum();
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
    totalSum();
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
              name={ name }
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ ({ target: { name: nameInput } }) => {
                if (qtd > 0) {
                  setQtd(qtd - 1);
                  saveItensCartSub(nameInput);
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
                setQtd(qtd + 1);
                saveItensCartSum(nameInput);
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
