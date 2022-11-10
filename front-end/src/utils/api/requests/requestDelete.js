import axios from 'axios';

const requestDelete = async (endpoint, body) => {
  await axios.delete(endpoint, { data: { body } });
};

export default requestDelete;
