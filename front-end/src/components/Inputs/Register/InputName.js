import React from 'react';
import PropTypes from 'prop-types';

function NameInput({ dataId, handleForm }) {
  return (
    <label
      htmlFor="name"
      className="text-center text-lg mt-4 rounded-xl"
    >
      <input
        id="name"
        className="name-input rounded-md text-center w-72 h-8 bg-[#eae0ba] border-[1px]
        border-[#060605] text-lg"
        type="name"
        placeholder="Seu nome"
        data-testid={ dataId }
        { ...handleForm.register('name', { minLength: 12, required: true }) }
      />

    </label>
  );
}

NameInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default NameInput;
