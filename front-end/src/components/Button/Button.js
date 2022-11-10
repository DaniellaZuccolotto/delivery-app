import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, onClick, isSubmit, disable, dataId }) {
  return (
    <button
      type={ isSubmit ? 'submit' : 'button' }
      onClick={ onClick }
      disabled={ disable }
      data-testid={ dataId }
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSubmit: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  dataId: PropTypes.string.isRequired,
};

export default Button;
