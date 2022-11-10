import axios from 'axios';

const registerUser = async (user) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  axios.post('http://localhost:3001/register/adm', user, {
    headers: {
      Authorization: token,
    },
  });
};

export default registerUser;
