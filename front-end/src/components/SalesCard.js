import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestSale } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';
import dateFormater from '../utils/dateFormater';

function SalesCard() {
  const { saleSeller, setSaleSeller, setSaleDetails } = useContext(DeliveryContext);
  const history = useNavigate();

  const requestAPI = async () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const sales = await requestSale();
    const saleSaller = sales.filter((sale) => sale.sellerId === id);
    setSaleSeller(saleSaller);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const detailsClick = (id) => {
    const sale = saleSeller.filter((sales) => sales.id === id);
    setSaleDetails(sale);
    history(`/seller/orders/${id}`);
  };

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
      <table>
        <tbody
          className="mt-20 flex flex-col items-center self-center w-[52rem]"
        >
          {saleSeller.map((sale, index) => (
            <tr
              key={ index }
            >
              <button
                className="mt-2 flex items-center
                  bg-[#e8e8e7] border-[#cccaca] shadow-md rounded-lg
                  hover:bg-[#838383] shadow-slate-300 h-20 w-[45rem] border-[1px]"
                type="button"
                onClick={ () => { detailsClick(sale.id); } }
              >
                <td
                  className="w-20"
                  data-testid={
                    `seller_orders__element-order-id-${sale.id}`
                  }
                >
                  { sale.id }
                </td>
                <td
                  className={ `w-40 h-[90%] pt-6 rounded-md text-white 
                  ${bgColor(sale.status)} }` }
                  data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
                >
                  { sale.status }
                </td>
                <td
                  className="w-40"
                  data-testid={ `seller_orders__element-order-date-${sale.id}` }
                >
                  { dateFormater(sale.saleDate) }
                </td>
                <td
                  className="w-32"
                  data-testid={
                    `seller_orders__element-card-price-${sale.id}`
                  }
                >
                  { sale.totalPrice.replace('.', ',') }
                </td>
                <td
                  className="w-44"
                  data-testid={
                    `seller_orders__element-card-address-${sale.id}`
                  }
                >
                  { `${sale.deliveryAddress}, ${sale.deliveryNumber} ` }
                </td>
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesCard;
