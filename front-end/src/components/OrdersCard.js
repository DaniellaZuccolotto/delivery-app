import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormater from '../utils/dateFormater';

// referencia toLocaleString:
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

function OrdersCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;

  return (
    <Link to={ `/customer/orders/${id}` }>
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { `Pedido ${id}` }
      </span>
      <span
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </span>
      <span
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { dateFormater(saleDate) }
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { Number(totalPrice)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
      </span>
    </Link>
  );
}

OrdersCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default OrdersCard;
