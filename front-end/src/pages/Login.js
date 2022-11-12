import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeliveryContext from '../provider/DeliveryContext';
import delivery2 from '../images/delivery2.png';

function Login() {
  const { loginData, setLoginData,
    displayParagrafo, setDisplay } = useContext(DeliveryContext);
  const { email, password } = loginData;
  const history = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('/login')) {
      history('/login');
    }
    // esse if faz com que o usuário seja redirecionado para a tela de produtos caso já esteja logado
    // if (JSON.parse(localStorage.getItem('user'))) history('/customer/products');
  });

  const handleChange = ({ target: { value, name } }) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const disabledBtn = () => {
    const validateEmail = /^[\w+.]+@\w+\.\w{2,}/;
    const PASSWORD_LENGTH = 6;
    return (validateEmail.test(email) && password.length >= PASSWORD_LENGTH);
  };

  const requestUser = async () => {
    const payload = { email, password };
    try {
      const URL = 'http://localhost:3001/login';
      const response = await axios.post(URL, payload);
      setDisplay(false);
      return response.data.data;
    } catch (error) {
      console.log(error);
      setDisplay(true);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const user = await requestUser();
    if (!user) {
      history('/login');
      return null;
    }
    localStorage.setItem('user', JSON.stringify(user));
    switch (user.role) {
    case 'seller':
      history('/seller/orders');
      break;
    case 'administrator':
      history('/admin/manage');
      break;
    case 'customer':
      history('/customer/products');
      break;
    default:
      break;
    }
  };

  return (
    <div
      className="bg-gradient-to-r from-[#e99b9b] to-[#e9e38e]
      w-full h-screen flex justify-center"
    >
      <form
        className="align-middle flex
        flex-col w-96 h-96 mt-36 justify-center"
      >
        <img src={ delivery2 } alt="delivery" className="w-56 h-56 mx-auto mb-8 ml-10" />
        {/* <h1 className="text-center text-2xl font-bold text-cyan-900">LOGIN</h1> */}
        <label
          htmlFor="email"
          className="text-center mt-4"
        >
          <input
            name="email"
            value={ email }
            onChange={ handleChange }
            type="email"
            id="email"
            placeholder="E-mail"
            data-testid="common_login__input-email"
            className="name-input rounded-md text-center w-72 h-8 bg-[#eae0ba]
             border-[1px] border-[#060605] text-lg"
          />
        </label>
        <label
          htmlFor="password"
          className="text-center text-lg mt-4"
        >
          <input
            name="password"
            value={ password }
            onChange={ handleChange }
            type="password"
            id="password"
            placeholder="Password"
            data-testid="common_login__input-password"
            className="name-input rounded-md text-center w-72 h-8 bg-[#eae0ba]
             border-[1px] border-[#060605] text-lg"
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ !disabledBtn() }
          onClick={ handleClick }
          className="bg-[#01264e] hover:bg-sky-700 mt-4
          rounded-md w-56 h-10 mx-auto text-white text-sm"
        >
          LOGIN
        </button>
        { displayParagrafo
        && (
          <p
            data-testid="common_login__element-invalid-email"
          >
            Usuário inválido
          </p>)}
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => history('/register') }
          className="bg-[#01264e] hover:bg-sky-700 mt-4 w-56 h-10
          rounded-md mx-auto text-white text-sm"
        >
          NÃO TENHO CONTA
        </button>
      </form>
    </div>
  );
}

export default Login;
