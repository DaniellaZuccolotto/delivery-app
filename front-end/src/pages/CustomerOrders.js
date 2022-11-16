import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import OrdersCard from '../components/OrdersCard';
import { requestOrders } from '../utils/requestAPI';

function CustomerOrders() {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await requestOrders();
    const filteredOrders = response.filter((order) => order.userId === user.id);
    setOrders(filteredOrders || []);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="h-screen w-screen">
      <NavBar user={ user } history={ history } />
      <main className="h-full w-screen pt-20">
        { orders.map((order) => <OrdersCard key={ order.id } order={ order } />) }
      </main>
    </div>
  );
}

export default CustomerOrders;
