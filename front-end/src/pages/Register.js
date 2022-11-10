import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
import DeliveryContext from '../provider/DeliveryContext';
import { createUser } from '../utils/requestAPI';

function Register() {
  const { newUser, setnewUser } = useContext(DeliveryContext);
  const { name, email, password } = newUser;
  // const history = useNavigate();
  // const { pathname } = useLocation();
  // const [invalidUser, setInvalidUser] = useState(false);

  const handleChange = ({ target: { value, name: Name } }) => {
    setnewUser((prevState) => ({
      ...prevState,
      [Name]: value,
    }));
  };

  const disabledBtn = () => {
    const validateEmail = /^[\w+.]+@\w+\.\w{2,}/;
    const PASSWORD_LENGTH = 6;
    const NOME_LENGTH = 12;
    return (validateEmail.test(email) && password.length >= PASSWORD_LENGTH
      && name.length >= NOME_LENGTH);
  };

  const handleClick = async () => {
    const user = await createUser(newUser);
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    // history('/customer/products');
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          <input
            name="name"
            value={ name }
            onChange={ handleChange }
            type="name"
            id="name"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
          />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            value={ email }
            onChange={ handleChange }
            type="email"
            id="email"
            placeholder="E-mail"
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
          />
        </label>
        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ !disabledBtn() }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        {/* { invalidUser
        && (
          <p
            data-testid="common_register__element-invalid_register"
          >
            Usuário inválido
          </p>)} */}
      </form>
    </div>
  );
}

export default Register;
