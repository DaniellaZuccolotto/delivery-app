import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryContext from '../provider/DeliveryContext';
import dateFormater from '../utils/dateFormater';
import { requestOrder, updateSaleStatus } from '../utils/requestAPI';

const STATUS = 'Em Trânsito';

function SalesCardDetails() {
  const { saleDetails, setSaleDetails } = useContext(DeliveryContext);
  const { id } = useParams();

  const getOrderAndSetDetail = async () => {
    setSaleDetails([await requestOrder(id)]);
  };

  const changeStatusForPreparing = async () => {
    await updateSaleStatus(id, 'Preparando');
    await getOrderAndSetDetail();
  };

  const changeStatusForTraffic = async () => {
    await updateSaleStatus(id, STATUS);
    await getOrderAndSetDetail();
  };

  useEffect(() => {
    getOrderAndSetDetail();
  }, []);

  console.log(saleDetails);

  return (
    <div>
      <table>
        <tbody>
          {saleDetails.map((sale, index) => (
            <tr key={ index }>
              <td
                data-testid="seller_order_details__element-order-details-label-order-id"
              >
                Pedido:
                { sale.id }
              </td>
              <td
                data-testid="seller_order_details__element-order-details-label-order-date"
              >
                { dateFormater(sale.saleDate) }
              </td>
              <td
                data-testid={ 'seller_order_details__'
                + 'element-order-details-label-delivery-status' }
              >
                { sale.status }
              </td>
              <td>
                <button
                  type="button"
                  onClick={ changeStatusForPreparing }
                  disabled={ ['Preparando', STATUS, 'Entregue']
                    .includes(sale.status) }
                  data-testid="seller_order_details__button-preparing-check"
                >
                  Preparar Pedido
                </button>
              </td>
              <td>
                <button
                  type="button"
                  disabled={ ['Pendente', STATUS, 'Entregue']
                    .includes(sale.status) }
                  onClick={ changeStatusForTraffic }
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
