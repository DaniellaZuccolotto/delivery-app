import React from 'react';
import PropTypes from 'prop-types';

function EmailInput({ dataId, handleForm }) {
  return (
    <label
      htmlFor="email"
      className="text-center text-lg mt-4 rounded-xl"
    >
      <input
        id="email"
        type="text"
        className="rounded-md text-center w-72 h-8 bg-[#eae0ba] border-[1px]
        border-[#060605] mt-5"
        placeholder="Seu email"
        data-testid={ dataId }
        { ...handleForm.register(
          'email',
          { pattern: /[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, required: true },
        ) }
      />

    </label>
  );
}

EmailInput.propTypes = {
  dataId: PropTypes.string,
}.isRequired;

export default EmailInput;
