import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestOrder } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';
import NavBar from '../components/NavBar';

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  const { setProductsCart, productsCart } = useContext(DeliveryContext);
  const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
  const productsSave = Object.keys(productsCartLocal[0]);
  const productsValues = Object.values(Object.values(productsCartLocal[0]));
  const tHead = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const seller = Object.values(JSON.parse(localStorage.getItem('vendedor')));

  const saveOrder = async () => {
    setOrder([await requestOrder(id)]);
  };

  const initProducts = () => {
    setProductsCart(productsSave);
  };

  useEffect(() => {
    saveOrder();
    initProducts();
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
              data-testid="customer_order_details__element-order-details-label-seller-name"
            >
              P.Vend:
              { seller[0].name }
            </td>
            <td
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { orders.saleDate }
            </td>
            <td
              data-testid={ `customer_order_details__element-order-details-label-delivery-status${index}` }
            >
              { orders.status }
            </td>

            <button
              type="button"
              disabled="true"
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
        {productsCart.map((product, i) => (
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
              { product }
            </td>
            <td
              data-testid={ `customer_order_details__element-order-table-quantity-${i}` }
            >
              { productsValues[i].quantity }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-unit-price-${i}`
              }
            >
              { productsValues[i].price.toFixed(2).replace('.', ',') }
            </td>
            <td
              data-testid={
                `customer_order_details__element-order-table-sub-total-${i}`
              }
            >
              { productsValues[i].total.toFixed(2).replace('.', ',') }
            </td>
          </tr>
        ))}
      </tbody>
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        Total:
        { productsValues.reduce((acc, curr) => acc + curr.total, 0)
          .toFixed(2).replace('.', ',') }
      </p>
  </div>
 )};

export default OrderDetails;
