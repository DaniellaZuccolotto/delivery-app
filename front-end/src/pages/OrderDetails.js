import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import requestSeller, { requestOrder } from '../utils/requestAPI';
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

  useEffect(() => {
    saveOrder();
  }, []);

  return (
    <div>
      <NavBar user={ user } history={ history } />
      <h1>Detalhe do Pedido</h1>
      <section>
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
              type="button"
              disabled={ orders.status === 'Entregue' }
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar como entregue
            </button>
          </>
        ))}
      </section>
      <thead>
        <tr>
          {tHead.map((coluns, i) => <th key={ i }>{coluns}</th>)}
        </tr>
      </thead>
      <tbody>
        { order.length === 0 ? null : order[0].products.map((product, i) => (
          <tr key={ i }>
            <td
              data-testid={
                `customer_order_details__element-order-table-item-number-${i}`
              }
            >
              { i + 1 }
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-name-${i}` }
            >
              { product.name }
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-quantity-${i}` }
            >
              { product.salesProduct.quantity }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${i}`
              }
            >
              { Number(product.price).toFixed(2).replace('.', ',') }
            </td>
            <td
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
