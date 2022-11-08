import axios from 'axios';

const URL_ORDERS = 'http://localhost:3001/orders';

export const requestProducts = async () => {
  try {
    const URL = 'http://localhost:3001/products';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(URL, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const requestSeller = async () => {
  try {
    const URL = 'http://localhost:3001/register/sellers';
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSale = async (bodyProducts, bodySales) => {
  const payload = { bodyProducts, bodySales };
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(
      URL_ORDERS,
      payload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestOrder = async (id) => {
  try {
    const URL = `http://localhost:3001/orders/${id}`;
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestSale = async () => {
  try {
    const response = await axios.get(URL_ORDERS);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestSaleProducts = async () => {
  try {
    const URL = 'http://localhost:3001/orders/sales';
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const requestOrders = async () => {
  try {
    const URL = 'http://localhost:3001/orders';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(
      URL,
      { headers: { Authorization: token } },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSaleStatus = async (id, status) => {
  const body = { status };
  try {
    const URL = `http://localhost:3001/orders/${id}`;
    const response = await axios.put(
      URL,
      body,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default requestSeller;
