import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function OrderDetails() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  return (
    <div>
      <NavBar user={ user } history={ history } />
      <h1>Detalhes do Pedido</h1>
    </div>
  );
}

export default OrderDetails;
