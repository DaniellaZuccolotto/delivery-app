import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductsCard from '../components/ProductsCard';
import DeliveryContext from '../provider/DeliveryContext';
import { requestProducts } from '../utils/requestAPI';
import carrinho from '../images/carrinho-de-compras.png';

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

  const requestProduct = async () => {
    const returnProducts = await requestProducts();
    setProducts(returnProducts);
  };

  useEffect(() => {
    requestProduct();
    totalPriceLocal();
  }, []);

  const LENGTH_LIST = 11;
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="flex flex-col">
      <NavBar user={ user } history={ history } />
      <Link to="/customer/checkout">
        <div
          className="w-72 h-12 ml-5 fixed
         text-[#181818] text-sm mt-[38rem] flex items-center"
        >
          <button
            className="bg-[#cccaca] hover:bg-[#838383] w-36 h-10 shadow-md
            shadow-slate-300
              text-[#181818] text-sm rounded-l-lg pl-4 flex items-center"
            type="button"
            data-testid="customer_products__button-cart"
            disabled={ totalPrice === 0 }
          >
            <img
              src={ carrinho }
              alt="carrinho"
              className="w-8 h-8 mr-2"
            />
            Ver Carrinho:
          </button>
          <button
            className="bg-[#cccaca] hover:bg-[#838383] w-10 h-10
              text-[#181818] text-sm rounded-r-lg pr-3 shadow-md
              shadow-slate-300"
            type="button"
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice.toFixed(2).replace('.', ',') }
          </button>
        </div>
      </Link>
      <form className="flex justify-center mt-14">
        <div
          className="flex flex-wrap w-[80vw] justify-evenly
            h-full mt-3"
        >
          {
            products
              .slice(0, LENGTH_LIST).map((product, index) => (
                <ProductsCard
                  key={ index }
                  products={ product }
                />
              ))
          }
        </div>
      </form>
    </div>
  );
}

export default Products;
