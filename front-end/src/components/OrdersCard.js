import React from 'react';
import PropTypes from 'prop-types';

function OrdersCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;

  return (
    <div>
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
        data-testid={ `customer_orders__element-order-date${id}` }
      >
        { saleDate }
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { totalPrice }
      </span>
    </div>
  );
}

OrdersCard.propTypes = {
  order: PropTypes.objectOf().isRequired,
};

export default OrdersCard;
