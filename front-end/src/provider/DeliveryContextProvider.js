import React, { useMemo, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryContextProvider({ children }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayParagrafo, setDisplay] = useState(false);
  const [productsCart, setProductsCart] = useState([]);

  // const history = useHistory();
  // const path = history.location.pathname;

  const contextValue = useMemo(() => ({
    loginData,
    displayParagrafo,
    setLoginData,
    setDisplay,
    products,
    setProducts,
    totalPrice,
    setTotalPrice,
    productsCart,
    setProductsCart,
  }), [loginData, displayParagrafo, products, totalPrice, productsCart]);

  return (
    <DeliveryContext.Provider value={ contextValue }>
      { children }
    </DeliveryContext.Provider>
  );
}

DeliveryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryContextProvider;
