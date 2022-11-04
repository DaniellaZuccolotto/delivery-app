import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import ProductList from '../components/ProductsList';
import { requestOrder } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';

function OrderDetails() {
  const [order, setOrder] = useState([]);
  const { id } = useParams();

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

  console.log(order);

  useEffect(() => {
    saveOrder();
    initProducts();
  }, []);

  return (
    <div>
      <h1>Detalhe do Pedido</h1>

      <tbody>
        {order.map((orders, index) => (
          <tr key={ index }>
            <td
              data-testid="
              customer_order_details__element-order-details-label-order-id"
            >
              Pedido
              {' '}
              {`00${orders.id}`}
              {' '}
            </td>
            <td
              data-testid="customer_order_
                  details__element-order-details-label-seller-name"
            >
              P.Vend:
              {' '}
              { seller[0].name }

            </td>
            <td
              data-testid="customer_order_details__
                  element-order-details-label-order-date"
            >
              { orders.saleDate }

            </td>
            <td
              data-testid={
                `customer_order_details__
                  element-order-details-label-delivery-status${index}`
              }
            >
              { orders.status }

            </td>

            <button
              type="submit"
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar como entregue
            </button>
          </tr>
        ))}
      </tbody>

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
              data-testid={ `customer_order_details__
                  element-order-table-quantity-${i}` }
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
        {' '}
        { productsValues.reduce((acc, curr) => acc + curr.total, 0)
          .toFixed(2).replace('.', ',') }
      </p>

    </div>
  );
}

export default OrderDetails;
