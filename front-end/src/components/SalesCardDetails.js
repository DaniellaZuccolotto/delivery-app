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

  return (
    <div className="flex flex-center mt-10">
      <table>
        <tbody className="flex flex-center">
          {saleDetails.map((sale, index) => (
            <tr
              className="flex self-center justify-evenly items-center h-12 mt-3
             border-[1px] border-[#cccaca] shadow-lg
              shadow-slate-300 w-[58rem] bg-[#e8e8e7]"
              key={ index }
            >
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
                  className="border-[3px] bg-[#edbe47] w-40
                  hover:bg-[#a37b15] border-[#cccaca] shadow-md
                  shadow-slate-300 text-md"
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
                  className="border-[3px] bg-[#edbe47] w-40
                  hover:bg-[#a37b15] border-[#cccaca] shadow-md
                   shadow-slate-300 text-md"
                  type="button"
                  disabled={ ['Pendente', STATUS, 'Entregue']
                    .includes(sale.status) }
                  onClick={ changeStatusForTraffic }
                  data-testid="seller_order_details__button-dispatch-check"
                >
                  Saiu para entrega
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesCardDetails;
