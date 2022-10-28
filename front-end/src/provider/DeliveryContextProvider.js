import React, { useMemo, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeliveryContext from './DeliveryContext';

function DeliveryContextProvider({ children }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  // const history = useHistory();
  // const path = history.location.pathname;

  const contextValue = useMemo(() => ({
    loginData,
    setLoginData,
  }), [loginData]);

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
