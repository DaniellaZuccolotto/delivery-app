import axios from 'axios';

const registerUser = async (userInfos) => axios.post('/users/register', {
  ...userInfos,
});

export default registerUser;
