import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeliveryContext from '../provider/DeliveryContext';

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
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      history('/customer/products');
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            name="email"
            value={ email }
            onChange={ handleChange }
            type="email"
            id="email"
            placeholder="E-mail"
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            value={ password }
            onChange={ handleChange }
            type="password"
            id="password"
            placeholder="Password"
            data-testid="common_login__input-password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ !disabledBtn() }
          onClick={ handleClick }
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
          // onClick={ handleClick }
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
