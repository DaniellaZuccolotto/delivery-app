import React from 'react';
import NavBarSeller from '../components/NavBarSeller';
import SalesCardDetails from '../components/SalesCardDetails';
import SalesProductsCardDetails from '../components/SalesProductsCardDetails';
// import ProductsList from '../components/ProductsList';

function OrderDetails() {
  return (
    <div>
      <NavBarSeller />
      <h1>Detalhes do Pedido</h1>
      <SalesCardDetails />
      <SalesProductsCardDetails />
      {/* <ProductsList /> */}
    </div>
  );
}

export default OrderDetails;
