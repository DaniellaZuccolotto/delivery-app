import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { requestSale } from '../utils/requestAPI';
// import DeliveryContext from '../provider/DeliveryContext';

function NavBarSeller() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useNavigate();
  // const currentURL = useLocation();

  // const { setSaleSeller } = useContext(DeliveryContext);

  // const requestAPI = async () => {
  //   const { id } = JSON.parse(localStorage.getItem('user'));
  //   const sales = await requestSale();
  //   const saleSaller = sales.filter((sale) => sale.sellerId === id);
  //   setSaleSeller(saleSaller);
  // };

  return (
    <div>
      <button
        type="submit"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history('/seller/orders') }
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
