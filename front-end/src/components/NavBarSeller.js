import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBarSeller() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  return (
    <div>
      <button
        type="submit"
        data-testid="customer_products__element-navbar-link-orders"
        // onClick={ handleClick }
      >
        PEDIDOS
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

export default NavBarSeller;
