import axios from 'axios';

export const registerUserAdm = async (user) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  axios.post('http://localhost:3001/register/adm', user, {
    headers: {
      Authorization: token,
    },
  });
};

const registerUser = async (user) => axios.post('http://localhost:3001/register', user);

export default registerUser;
