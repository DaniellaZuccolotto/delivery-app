import React from 'react';
// import DeliveryContext from '../provider/DeliveryContext';

function ProductsList() {
  const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
  const productsSave = Object.keys(productsCartLocal[0]);
  const productsValues = Object.values(Object.values(productsCartLocal[0]));
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tHead.map((coluns, i) => <th key={ i }>{coluns}</th>)}
          </tr>
        </thead>
        <tbody>
          {productsSave.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index }
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
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  style={ { margin: '20px' } }
                  onClick={ () => {
                    if (qtd > 0) {
                      setQtd(qtd - 1); totalSumSub();
                      saveItensCartSub({ target: { name: nameInput } });
                    }
                  } }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        { productsValues.reduce((acc, curr) => acc + curr.total, 0) }
      </p>
    </div>
  );
}

export default ProductsList;
