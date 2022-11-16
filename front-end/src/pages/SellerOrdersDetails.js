import React from 'react';
import NavBarSeller from '../components/NavBarSeller';
import SalesCardDetails from '../components/SalesCardDetails';
import SalesProductsCardDetails from '../components/SalesProductsCardDetails';

function OrderDetails() {
  return (
    <div>
      <NavBarSeller />
      <h1>Detalhe do Pedido</h1>
      <div className="flex flex-col items-center justify-center">
        <SalesCardDetails />
        <SalesProductsCardDetails />
      </div>
    </div>
  );
}

export default OrderDetails;
