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
        id,
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
        id,
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
        id,
      },
    };
    localStorage.setItem('productsCart', JSON.stringify(saveObj));
    totalSum();
  };

  return (
    <div
      className="flex justify-center bg-white w-48 h-56 items-center
      border-[1px] border-[#cccaca] shadow-md
      shadow-slate-300 m-3 rounded-lg"
    >
      { !products ? <h1>Loading...</h1>
        : (
          <main className="w-52 h-52 flex flex-col justify-center items-center">
            <img
              className={ name === 'Skol Lata 250ml' ? 'w-16 h-28' : 'w-32 h-28' }
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
            />
            <div className="flex flex-col justify-center items-center">
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
              <div
                className="flex justify-between border-[1px]
                border-[#aeacac] rounded-md h-6"
              >
                <button
                  type="button"
                  className="bg-[#cccaca] hover:bg-[#838383] w-7 h-6 rounded-l-md"
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
                    className="w-10 text-center ml-2 h-5"
                    onChange={ ({ target: { value, name: nameInput } }) => {
                      setQtd(Number(value));
                      saveItensCart(value, nameInput);
                    } }
                    data-testid={ `customer_products__input-card-quantity-${id}` }
                  />
                </label>
                <button
                  type="button"
                  className="bg-[#cccaca] hover:bg-[#838383] w-7 rounded-r-md h-6"
                  name={ name }
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                  onClick={ ({ target: { name: nameInput } }) => {
                    setQtd(qtd + 1);
                    saveItensCartSum(nameInput);
                  } }
                >
                  +
                </button>
              </div>
            </div>
          </main>
        )}
    </div>
  );
}

ProductsCard.propTypes = {
  products: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};

export default ProductsCard;
