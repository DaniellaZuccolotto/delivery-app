import axios from 'axios';

const requestCreate = async (endpoint, body) => {
  const { data } = await axios.post(endpoint, body);
  return data;
};

export default requestCreate;
