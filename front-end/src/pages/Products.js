import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import DeliveryContext from '../provider/DeliveryContext';

function Products() {
  const { products, setProducts,
    totalPrice, setTotalPrice } = useContext(DeliveryContext);
  const history = useNavigate();

  const totalPriceLocal = () => {
    const productsLocal = JSON.parse(localStorage.getItem('productsCart'));
    if (!productsLocal) {
      return 0;
    }
    const productsCartLocal = [JSON.parse(localStorage.getItem('productsCart'))];
    const productsValues = Object.values(Object.values(productsCartLocal[0]));
    const total = productsValues.reduce((acc, curr) => acc + curr.total, 0);
    setTotalPrice(total);
  };

  const requestProducts = async () => {
    try {
      const URL = 'http://localhost:3001/products';
      const { token } = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(URL, {
        headers: {
          Authorization: token,
        },
      });
      setProducts(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestProducts();
    totalPriceLocal();
  }, []);

  const LENGTH_LIST = 11;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <form>
        <NavBar user={ user } history={ history } />
        <Link to="/customer/checkout">
          <button
            type="button"
            data-testid="customer_products__button-cart"
            disabled={ totalPrice === 0 }
            // onClick={ () => history('/customer/checkout') }
          >
            Ver Carrinho:
          </button>
          <button
            type="button"
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice.toFixed(2).replace('.', ',') }
          </button>
        </Link>
        {
          products
            .slice(0, LENGTH_LIST).map((product, index) => (
              <div key={ index }>
                <ProductsCard
                  products={ product }
                />
              </div>))
        }
      </form>
    </div>
  );
}

export default Products;
