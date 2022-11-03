import React from 'react';
import { useNavigate } from 'react-router-dom';
import DetailsAdress from '../components/DetailsAdress';
import NavBar from '../components/NavBar';
import ProductsList from '../components/ProductsList';

function Checkout() {
  // const { productsCart, setProductsCart } = useContext(DeliveryContext);
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <NavBar user={ user } history={ history } />
      <h2>Finalizar Pedido</h2>
      <ProductsList />
      <h2>Detalhes e Endereço para Entrega</h2>
      <DetailsAdress />
    </div>
  );
}

export default Checkout;
