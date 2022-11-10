import React from 'react';
import PropTypes from 'prop-types';

function EmailInput({ dataId, handleForm }) {
  return (
    <label htmlFor="email">

      <span>Email</span>

      <input
        id="email"
        type="text"
        placeholder="Email"
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
