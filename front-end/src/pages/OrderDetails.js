import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import requestSeller, { requestOrder, updateSaleStatus } from '../utils/requestAPI';
import NavBar from '../components/NavBar';
import dateFormater from '../utils/dateFormater';

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [seller, setSeller] = useState();
  const { id } = useParams();
  const history = useNavigate();
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];
  const user = JSON.parse(localStorage.getItem('user'));

  const saveOrder = async () => {
    const orderResponse = await requestOrder(id);
    setOrder([orderResponse]);
    const sellersResponse = await requestSeller();
    setSeller(sellersResponse
      .find(({ id: sellerId }) => sellerId === orderResponse.sellerId));
  };

  const handleDeliveryCheckButton = async () => {
    const updatedSale = await updateSaleStatus(id, 'Entregue');
    setOrder([updatedSale]);
  };

  useEffect(() => {
    saveOrder();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <NavBar user={ user } history={ history } />
      <h1 className="pt-16 text-xl self-start pl-44">Detalhes do Pedido</h1>
      <section
        className="flex justify-evenly items-center h-12 mt-3 mb-3
        border-[1px] border-[#cccaca] shadow-lg shadow-slate-300 w-[58rem] bg-[#e8e8e7]"
      >
        { order.map((orders, index) => (
          <>
            <td
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              Pedido:
              { orders.id }
            </td>
            <td
              data-testid={ 'customer_order_details__'
             + 'element-order-details-label-seller-name' }
            >
              P.Vend:
              { seller ? seller.name : null }
            </td>
            <td
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { dateFormater(orders.saleDate) }
            </td>
            <td
              data-testid={ 'customer_order_details__'
              + `element-order-details-label-delivery-status${index}` }
            >
              { orders.status }
            </td>
            <button
              className="border-[3px] bg-[#edbe47] w-40 hover:bg-[#a37b15]
              border-[#cccaca] shadow-md shadow-slate-300 text-md"
              type="button"
              disabled={ ['Pendente', 'Preparando', 'Entregue'].includes(orders.status) }
              onClick={ handleDeliveryCheckButton }
              data-testid="customer_order_details__button-delivery-check"
            >
              Confirmar entrega
            </button>
          </>
        ))}
      </section>
      <thead
        className="flex self-center w-[52rem] h-10 border-b-[1px]
        border-[#cccaca] shadow-md shadow-slate-300"
      >
        <tr className="self-center">
          {tHead.map((coluns, i) => (
            <th className="self-center w-52" key={ i }>{coluns}</th>))}
        </tr>
      </thead>
      <tbody
        className="flex flex-col items-center self-center w-[52rem]"
      >
        { order.length === 0 ? null : order[0].products.map((product, i) => (
          <tr
            className="flex self-center w-[52rem] border-b-[3px]
            border-[#cccaca] shadow-md shadow-slate-300 h-10"
            key={ i }
          >
            <td
              className="self-center w-32 text-center pl-4"
              data-testid={
                `customer_order_details__element-order-table-item-number-${i}`
              }
            >
              { i + 1 }
            </td>
            <td
              className="self-center w-64 text-center pr-3"
              data-testid={ `customer_order_details__element-order-table-name-${i}` }
            >
              { product.name }
            </td>
            <td
              className="self-center w-32 text-center pr-12"
              data-testid={ `customer_order_details__element-order-table-quantity-${i}` }
            >
              { product.salesProduct.quantity }
            </td>
            <td
              className="self-center w-36 text-center pl-4"
              data-testid={
                `customer_order_details__element-order-table-unit-price-${i}`
              }
            >
              { Number(product.price).toFixed(2).replace('.', ',') }
            </td>
            <td
              className="self-center w-36 text-center pl-10"
              data-testid={
                `customer_order_details__element-order-table-sub-total-${i}`
              }
            >
              { (product.price * product.salesProduct.quantity)
                .toFixed(2).replace('.', ',') }
            </td>
          </tr>
        ))}
      </tbody>
      <p
        className="self-end text-center border-[3px] bg-[#edbe47]
          border-[#cccaca] shadow-md shadow-slate-300 mt-5 mr-56 w-40 h-9 text-xl"
        data-testid="customer_order_details__element-order-total-price"
      >
        Total:
        { order.length === 0 ? null : order[0].totalPrice
          .replace('.', ',') }
      </p>
    </div>
  );
}

export default OrderDetails;
