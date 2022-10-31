import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DeliveryContextProvider from './provider/DeliveryContextProvider';
import Login from './pages/Login';
import './App.css';
import Products from './pages/Products';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <DeliveryContextProvider>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        {/* <Route><h1>Not Found</h1></Route> */}
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
