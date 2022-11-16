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
    <div className="flex flex-col items-center">
      <NavBar user={ user } history={ history } />
      <h2 className="pt-16 text-xl self-start pl-40">Finalizar Pedido</h2>
      <ProductsList />
      <h2 className="pt-4 text-xl self-start pl-40">Detalhes e Endereço para Entrega</h2>
      <DetailsAdress />
    </div>
  );
}

export default Checkout;
