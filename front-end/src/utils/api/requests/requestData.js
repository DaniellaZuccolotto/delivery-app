import axios from 'axios';

const requestData = async (endpoint) => {
  const { data } = await axios.get(endpoint);
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await axios.post(
    data,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

export default requestData;
