import axios from 'axios';

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
    const URL = 'http://localhost:3001/orders';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(
      URL,
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

export default requestSeller;
