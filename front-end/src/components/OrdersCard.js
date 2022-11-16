import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dateFormater from '../utils/dateFormater';

// referencia toLocaleString:
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

function OrdersCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;
  const history = useNavigate();

  const bgColor = (statusBg) => {
    switch (statusBg) {
    case 'Pendente':
      return 'bg-[#b74c48]';
    case 'Preparando':
      return 'bg-[#b74c48]';
    case 'Em Trânsito':
      return 'bg-[#edbe47]';
    case 'Entregue':
      return 'bg-green-700';
    default:
      break;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="mt-1 flex justify-evenly items-center
        bg-[#e8e8e7] border-[#cccaca] shadow-md hover:bg-[#838383]
        shadow-slate-300 h-20 w-[35rem] border-[1px]"
        type="button"
        onClick={ () => history(`/customer/orders/${id}`) }
      >
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { `Pedido ${id}` }
        </span>
        <span
          className={ `w-40 h-[90%] pt-6 rounded-md text-white ${bgColor(status)} }` }
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
      </button>
    </div>
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
