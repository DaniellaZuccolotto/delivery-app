import React from 'react';
import PropTypes from 'prop-types';

function NavBar({ user, history }) {
  return (
    <div>
      <button
        type="submit"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        type="submit"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history('/customer/orders') }
      >
        MEUS PEDIDOS
      </button>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user.name }
      </p>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => {
          localStorage.clear();
          history('/login');
        } }
      >
        SAIR
      </button>
    </div>
  );
}

NavBar.propTypes = {
  user: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  history: PropTypes.func.isRequired,
};

export default NavBar;
