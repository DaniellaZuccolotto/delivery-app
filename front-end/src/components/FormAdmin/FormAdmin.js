import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FormAdmin({ createUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [btnCreate] = useState([true, true, true]);
  const [isDisabled, setIsDisabled] = useState(true);

  const validateName = async (value) => {
    const NUMBER_OF_LETTERS = 12;
    if (value.length >= NUMBER_OF_LETTERS) {
      btnCreate[2] = false;
    } else {
      btnCreate[2] = true;
    }
  };

  const validateEmail = async (value) => {
    const REGEX_EMAIL = /\S+@\S+\.\S+/;
    if (REGEX_EMAIL.test(value)) {
      btnCreate[0] = false;
    } else {
      btnCreate[0] = true;
    }
  };

  const validatePassword = (value) => {
    const NUMBER_OF_LETTERS = 5;
    if (value.length > NUMBER_OF_LETTERS) {
      btnCreate[1] = false;
    } else {
      btnCreate[1] = true;
    }
  };

  const verifyDisabled = async () => {
    if (btnCreate[0] === false && btnCreate[1] === false && btnCreate[2] === false) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const verifyName = (value) => {
    validateName(value);
    verifyDisabled();
  };

  const verifyEmail = (value) => {
    validateEmail(value);
    verifyDisabled();
  };

  const verifyPassword = (value) => {
    validatePassword(value);
    verifyDisabled();
  };

  const createUserVerify = async (event) => {
    event.preventDefault();

    createUser({ name, email, password, role });
  };

  return (
    <form>
      <h1> Cadastrar novo usuário </h1>
      <label htmlFor="name-input">
        Nome:
        <input
          type="text"
          onChange={ (e) => verifyName(e.target.value) }
          onBlur={ (e) => setName(e.target.value) }
          placeholder="Nome"
          name="name"
          data-testid="admin_manage__input-name"
        />
      </label>
      <label htmlFor="email-input">
        Email:
        <input
          type="text"
          onChange={ (e) => verifyEmail(e.target.value) }
          onBlur={ (e) => setEmail(e.target.value) }
          placeholder="me@example.com"
          name="email"
          data-testid="admin_manage__input-email"
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          onChange={ (e) => verifyPassword(e.target.value) }
          onBlur={ (e) => setPassword(e.target.value) }
          name="password"
          data-testid="admin_manage__input-password"
        />
      </label>
      <label htmlFor="role-input">
        Tipo:
        <select
          data-testid="admin_manage__select-role"
          onChange={ (e) => setRole(e.target.value) }
          defaultValue="administrator"
        >
          <option value="administrator">Administrador</option>
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
      </label>
      <button
        data-testid="admin_manage__button-register"
        type="submit"
        onClick={ (event) => createUserVerify(event) }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
    </form>
  );
}

FormAdmin.propTypes = ({
  createUser: PropTypes.func.isRequired,
});

export default FormAdmin;
