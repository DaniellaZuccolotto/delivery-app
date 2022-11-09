import React from 'react';
import PropTypes from 'prop-types';

function PasswordInput({ dataId, handleForm }) {
  return (
    <label className="password-label" htmlFor="password">

      <span className="password-text-label">Senha</span>

      <input
        id="password"
        type="password"
        placeholder="Senha"
        className="password-input"
        { ...handleForm.register('password', { minLength: 6, required: true }) }
        data-testid={ dataId }
      />

    </label>
  );
}

PasswordInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default PasswordInput;
