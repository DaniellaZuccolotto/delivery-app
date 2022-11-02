import React from 'react';
import PropTypes from 'prop-types';
// import DeliveryContext from '../provider/DeliveryContext';

function ProductsList({ product, index, values }) {
  return (
    <td>
      { !product ? <h1>Loading...</h1>
        : (
          <ul>
            <span
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
              style={ { margin: '20px' } }
            >
              { index }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
              style={ { margin: '20px' } }
            >
              { product }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              style={ { margin: '20px' } }
            >
              { values.quantity }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
              style={ { margin: '20px' } }
            >
              { values.price.toFixed(2).replace('.', ',') }
            </span>
            <span
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
              style={ { margin: '20px' } }
            >
              { values.total.toFixed(2).replace('.', ',') }
            </span>
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              style={ { margin: '20px' } }
              onClick={ () => {
                if (qtd > 0) {
                  setQtd(qtd - 1); totalSumSub();
                  saveItensCartSub({ target: { name: nameInput } });
                }
              } }
            >
              Remover
            </button>
          </ul>
        )}
    </td>
  );
}

ProductsList.propTypes = {
  product: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductsList;
