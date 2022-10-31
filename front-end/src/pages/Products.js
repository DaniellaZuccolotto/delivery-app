import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsCard from '../components/PoductsCard';
import DeliveryContext from '../provider/DeliveryContext';

function Products() {
  const { products, setProducts } = useContext(DeliveryContext);
  const history = useNavigate();
  const [total, setTotal] = useState(0);

  const totalPrice = () => {
    const sum = JSON.parse(localStorage.getItem('totalPrice'));
    console.log(sum);
    if (!sum) {
      return 0;
    }
    setTotal(sum);
  };

  const requestProducts = async () => {
    try {
      const URL = 'http://localhost:3001/products';
      const { token } = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(URL, {
        headers: {
          Authorization: token,
        },
      });
      setProducts(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestProducts();
    totalPrice();
  }, [total]);

  // const handleChange = ({ target: { value, name } }) => {
  //   setLoginData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const disabledBtn = () => {
  //   const validateEmail = /^[\w+.]+@\w+\.\w{2,}/;
  //   const PASSWORD_LENGTH = 6;
  //   // console.log(validateEmail.test(email) && password.length > PASSWORD_LENGTH);
  //   return (validateEmail.test(email) && password.length >= PASSWORD_LENGTH);
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   requestUser();
  // };
  const LENGTH_LIST = 11;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <form>
        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-products"
          // disabled={ !disabledBtn() }
          // onClick={ handleClick }
        >
          PRODUTOS
        </button>
        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-orders"
          // onClick={ handleClick }
        >
          MEUS PEDIDOS
        </button>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.clear();
            history('/login');
          } }
        >
          SAIR
        </button>
        <button
          type="button"
        >
          Meu Carrinho:
          { total }
        </button>
        {
          products
            .slice(0, LENGTH_LIST).map((product, index) => (
              <div key={ index }>
                <ProductsCard
                  products={ product }
                />
              </div>))
        }
      </form>
    </div>
  );
}

export default Products;
