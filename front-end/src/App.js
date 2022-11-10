import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeliveryContextProvider from './provider/DeliveryContextProvider';
import Login from './pages/Login';
import './App.css';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Register from './pages/Register';
import Admin from './pages/Admin';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <DeliveryContextProvider>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/admin/manage" element={ <Admin /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route exact path="/seller/orders" element={ <SellerOrders /> } />
        <Route exact path="/seller/orders/:id" element={ <SellerOrdersDetails /> } />
      </Routes>
    </DeliveryContextProvider>

  // <div className="App">
  //   <span className="logo">TRYBE</span>
  //   <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
  //     Glass
  //   </object>
  // </div>
  );
}

export default App;
