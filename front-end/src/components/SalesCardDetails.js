import React, { useContext } from 'react';
import DeliveryContext from '../provider/DeliveryContext';
import formatDate from '../utils/formatDate';

function SalesCardDetails() {
  const { saleDetails } = useContext(DeliveryContext);

  return (
    <div>
      <table>
        <tbody>
          {saleDetails.map((sale, index) => (
            <tr key={ index }>
              <td
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                { sale.id }
              </td>
              <td
                data-testid="seller_order_details__element-order-details-label-order-date"
              >
                { formatDate(sale.saleDate) }
              </td>
              <td
                // eslint-disable-next-line max-len
                data-testid="seller_order_details__element-order-details-label-delivery-status"
              >
                { sale.status }
              </td>
              <td>
                <button
                  type="button"
                  data-testid="seller_order_details__button-preparing-check"
                >
                  Preparando Pedido
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="seller_order_details__button-dispatch-check"
                >
                  Saiu para entrega
                </button>
              </td>
              <td
                data-testid="seller_order_details__element-order-total-price"
              >
                { sale.totalPrice.replace('.', ',') }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesCardDetails;
