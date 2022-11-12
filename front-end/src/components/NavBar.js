import React from 'react';
import PropTypes from 'prop-types';

function NavBar({ user, history }) {
  return (
    <div
      className="bg-[#e8e8e7] border-b-[1px] border-[#cccaca] shadow-md
      shadow-slate-300 mb-4 fixed
        w-full h-12 flex justify-between items-center"
    >
      <div>
        <button
          className="bg-[#cccaca] hover:bg-[#838383] w-36 h-12
              text-[#181818] text-sm"
          type="submit"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => history('/customer/products') }
        >
          PRODUTOS
        </button>
        <button
          className="bg-[#cccaca] hover:bg-[#838383] w-36 h-12
          text-[#181818] text-sm"
          type="submit"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => history('/customer/orders') }
        >
          MEUS PEDIDOS
        </button>
      </div>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
        className="text-[#181818]  text-lg font-sans"
      >
        { user.name.toUpperCase() }
      </p>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        className="bg-[#cccaca] hover:bg-[#838383] w-36 h-12
        text-[#181818] text-sm border-r-[1px]"
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
