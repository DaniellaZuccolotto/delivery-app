import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../provider/DeliveryContext';

function ProductsList() {
  const { setProductsCart, productsCart } = useContext(DeliveryContext);
  const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
  const productsSave = Object.keys(productsCartLocal[0]);
  const productsValues = Object.values(Object.values(productsCartLocal[0]));
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  const removeItem = ({ target: { name } }) => {
    const itens = JSON.parse(localStorage.getItem('productsCart'));
    delete itens[name];
    localStorage.setItem('productsCart', JSON.stringify(itens));
    setProductsCart(Object.keys(itens));
  };

  const initProducts = () => {
    setProductsCart(productsSave);
  };

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <div
      className={ `flex flex-col bg-[#e8e8e7] border-[1px] border-[#cccaca]
       shadow-lg shadow-slate-300 w-[60rem] h-80` }
    >
      <table className="flex flex-col">
        <thead
          className="flex self-center w-[60rem] h-10 border-b-[1px]
        border-[#cccaca] shadow-md shadow-slate-300"
        >
          <tr className="self-center">
            {tHead.map((coluns, i) => (
              <th
                className="self-center w-40"
                key={ i }
              >
                {coluns}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="flex flex-col self-center h-10 w-[60rem]"
        >
          {productsCart.map((product, index) => (
            <tr
              key={ index }
              className="flex self-center w-[60rem] justify-center border-b-[3px]
              border-[#cccaca] shadow-md shadow-slate-300"
            >
              <td
                className="self-center w-36 text-center pl-6"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="self-center w-60 text-center"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product }
              </td>
              <td
                className="self-center w-40 text-center pr-6"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { productsValues[index].quantity }
              </td>
              <td
                className="self-center w-44 text-center pr-4"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { productsValues[index].price.toFixed(2).replace('.', ',') }
              </td>
              <td
                className="self-center w-40 text-center pl-3"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { productsValues[index].total.toFixed(2).replace('.', ',') }
              </td>
              <td>
                <button
                  name={ product }
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                  onClick={ removeItem }
                  className="self-center text-white bg-[#b74c48]
                    w-40 h-8 text-center hover:bg-[#8d211e]"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="self-end text-center border-[3px] bg-[#edbe47]
        border-[#cccaca] shadow-md shadow-slate-300 mt-48 mr-10 w-40 h-9 text-xl"
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total: ${productsValues.reduce((acc, curr) => acc + curr.total, 0)
          .toFixed(2).replace('.', ',')}` }
      </p>
    </div>
  );
}

export default ProductsList;
