import React from 'react';
import PropTypes from 'prop-types';

function PasswordInput({ dataId, handleForm }) {
  return (
    <label
      className="password-label text-center text-lg mt-4 rounded-xl"
      htmlFor="password"
    >
      <input
        id="password"
        type="password"
        placeholder="Sua senha"
        className="password-input rounded-md text-center w-72 h-8 bg-[#eae0ba]
         border-[1px] border-[#060605] mt-5"
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
