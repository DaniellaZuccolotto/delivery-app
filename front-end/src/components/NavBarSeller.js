import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBarSeller() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();

  return (
    <div
      className="bg-[#e8e8e7] border-b-[1px] border-[#cccaca] shadow-md
    shadow-slate-300 mb-4 fixed
      w-full h-12 flex justify-between items-center"
    >
      <button
        className="bg-[#cccaca] hover:bg-[#838383] w-36 h-12
          text-[#181818] text-sm"
        type="submit"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history('/seller/orders') }
      >
        PEDIDOS
      </button>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user.name.toUpperCase() }
      </p>
      <button
        className="bg-[#cccaca] hover:bg-[#838383] w-36 h-12
           text-[#181818] text-sm"
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
