import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { requestSaleProducts } from '../utils/requestAPI';
import DeliveryContext from '../provider/DeliveryContext';

function SalesProductsCardDetails() {
  const { listDetailsSale, setListDetailsSale,
    saleDetails } = useContext(DeliveryContext);
  const { pathname } = useLocation();
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];

  console.log(saleDetails);

  const initProducts = async () => {
    const id = pathname.split('/')[3];
    const resultProducts = await requestSaleProducts();
    const filter = resultProducts.filter((product) => product.id === Number(id));
    setListDetailsSale(filter[0].products);
  };

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <table>
        <thead
          className="flex self-center w-[52rem] h-10 border-b-[1px]
           border-[#cccaca] shadow-md shadow-slate-300"
        >
          <tr className="self-center">
            {tHead.map((coluns, i) => (
              <th
                className="self-center w-52"
                key={ i }
              >
                {coluns}

              </th>))}
          </tr>
        </thead>
        <tbody
          className="flex flex-col items-center self-center w-[52rem]"
        >
          {listDetailsSale.map((product, index) => (
            <tr
              className="flex self-center w-[52rem] border-b-[3px]
            border-[#cccaca] shadow-md shadow-slate-300 h-10"
              key={ index }
            >
              <td
                className="self-center w-32 text-center pl-4"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                className="self-center w-64 text-center pr-3"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                { product.name }
              </td>
              <td
                className="self-center w-32 text-center pr-12"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { product.salesProduct.quantity }
              </td>
              <td
                className="self-center w-36 text-center pl-4"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { product.price }
              </td>
              <td
                className="self-center w-36 text-center pl-10"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { (product.price * product.salesProduct.quantity)
                  .toFixed(2).replace('.', ',') }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="self-end text-center border-[3px] bg-[#edbe47]
                border-[#cccaca] shadow-md shadow-slate-300 mt-5 w-40 h-9 text-xl"
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total: ${saleDetails[0].totalPrice}` }
      </p>
    </div>
  );
}

export default SalesProductsCardDetails;
