import React, { useMemo, useState } from 'react';
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
  const [sale, setSale] = useState({
    userId: 0,
    sellerId: 2,
    totalPrice: 0,
    deliveryAddress: '',
    deliveryNumber: '',
    status: 'Pendente',
  });

  const [saleProducts, setSaleProducts] = useState({
    productId: [],
    quantity: [],
  });

  const [saleSeller, setSaleSeller] = useState([]);
  const [saleDetails, setSaleDetails] = useState([]);

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
    sale,
    setSale,
    saleProducts,
    setSaleProducts,
    saleSeller,
    setSaleSeller,
    saleDetails,
    setSaleDetails,
  }), [loginData, displayParagrafo, products, totalPrice, productsCart,
    sale, saleProducts, saleSeller, saleDetails]);

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
