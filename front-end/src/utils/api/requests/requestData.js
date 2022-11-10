import axios from 'axios';

const requestData = async (endpoint) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const result = await axios.get(endpoint, {
    headers: {
      Authorization: token,
    },
  });
  return result.data;
};

export default requestData;
