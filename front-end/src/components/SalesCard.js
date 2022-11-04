import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { requestSale } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';
import formatDate from '../utils/formatDate';

function SalesCard() {
  const { saleSeller, setSaleSeller } = useContext(DeliveryContext);

  const requestAPI = async () => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const sales = await requestSale();
    const saleSaller = sales.filter((sale) => sale.sellerId === id);
    setSaleSeller(saleSaller);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {saleSeller.map((sale, index) => (
            <tr key={ index }>
              <Link to={ `/seller/orders/${sale.id}` }>
                <td
                  data-testid={
                    `seller_orders__element-order-id-${sale.id}`
                  }
                >
                  { sale.id }
                </td>
                <td
                  data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
                >
                  { sale.status }
                </td>
                <td
                  data-testid={ `seller_orders__element-order-date-${sale.id}` }
                >
                  { formatDate(sale.saleDate) }
                </td>
                <td
                  data-testid={
                    `seller_orders__element-card-price-${sale.id}`
                  }
                >
                  { sale.totalPrice.replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `seller_orders__element-card-address-${sale.id}`
                  }
                >
                  { `${sale.deliveryAddress}, ${sale.deliveryNumber} ` }
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesCard;
