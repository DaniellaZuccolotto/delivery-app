import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsList from '../components/ProductsList';

function Checkout() {
  // const { productsCart, setProductsCart } = useContext(DeliveryContext);
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
  const productsSave = Object.keys(productsCartLocal[0]);
  const productsValues = Object.values(Object.values(productsCartLocal[0]));
  const tHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  console.log(Object.values(Object.values(productsCartLocal[0])));
  console.log(Object.keys(productsCartLocal[0]));
  return (
    <div>
      <NavBar user={ user } history={ history } />
      <h2>Finalizar Pedido</h2>
      <table>
        <thead>
          <tr>
            {tHead.map((coluns, i) => <th key={ i }>{coluns}</th>)}
          </tr>
        </thead>
      </table>
      <div>
        { productsSave.map((product, index) => (
          <tr key={ index }>
            <ProductsList
              product={ product }
              index={ index }
              values={ productsValues[index] }
            />
          </tr>)) }
      </div>
    </div>
  );
}

export default Checkout;
