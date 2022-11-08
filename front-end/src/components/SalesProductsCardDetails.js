import React, { useEffect } from 'react';
import { requestSaleProducts } from '../utils/requestAPI';
// import DeliveryContext from '../provider/DeliveryContext';

function SalesProductsCardDetails() {
  // const { saleDetails } = useContext(DeliveryContext);
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];
  // console.log(saleDetails);

  const initProducts = async () => {
    const resultProducts = await requestSaleProducts();
    console.log(resultProducts);
  };

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tHead.map((coluns, i) => <th key={ i }>{coluns}</th>)}
          </tr>
        </thead>
        {/* <tbody>
          {productsCart.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { productsValues[index].quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { productsValues[index].price.toFixed(2).replace('.', ',') }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { productsValues[index].total.toFixed(2).replace('.', ',') }
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
      {/* <p
        data-testid="customer_checkout__element-order-total-price"
      >
        { productsValues.reduce((acc, curr) => acc + curr.total, 0)
          .toFixed(2).replace('.', ',') }
      </p> */}
    </div>
  );
}

export default SalesProductsCardDetails;
