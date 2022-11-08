import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { requestSale } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';
import dateFormater from '../utils/dateFormater';

function SalesCard() {
  const { saleSeller, setSaleSeller, setSaleDetails } = useContext(DeliveryContext);

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
  };

  console.log(saleSeller);

  return (
    <div>
      <table>
        <tbody>
          {saleSeller.map((sale, index) => (
            <tr key={ index }>
              <Link
                to={ `/seller/orders/${sale.id}` }
                onClick={ () => { detailsClick(sale.id); } }
              >
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
                  { dateFormater(sale.saleDate) }
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
