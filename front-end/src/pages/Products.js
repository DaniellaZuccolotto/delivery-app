import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsCard from '../components/PoductsCard';
// import DeliveryContext from '../provider/DeliveryContext';

function Products() {
  // const { loginData, setLoginData,
  //   displayParagrafo, setDisplay } = useContext(DeliveryContext);
  // const { email, password } = loginData;
  const history = useNavigate();
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (!pathname.includes('/login')) {
  //     history('/login');
  //   }
  // });

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

  // const requestUser = async () => {
  //   const payload = { email, password };
  //   try {
  //     const URL = 'http://localhost:3001/login';
  //     const response = await axios.post(
  //       URL,
  //       payload,
  //     );

  //     setDisplay(false);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     setDisplay(true);
  //   }
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   requestUser();
  // };

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
          Nome do Usuário
        </p>
        <button
          type="submit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.clear();
            history('/login');
          } }
        >
          SAIR
        </button>
        <ProductsCard />
      </form>
    </div>
  );
}

export default Products;
