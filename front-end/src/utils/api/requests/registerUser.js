import axios from 'axios';

const registerUser = async (user) => axios.post('http://localhost:3001/register', user);

export default registerUser;
