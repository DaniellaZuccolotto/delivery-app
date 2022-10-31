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

  const [displayParagrafo, setDisplay] = useState(false);
  // const history = useHistory();
  // const path = history.location.pathname;

  const contextValue = useMemo(() => ({
    loginData,
    displayParagrafo,
    setLoginData,
    setDisplay,
    products,
    setProducts,
  }), [loginData, displayParagrafo, products]);

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
