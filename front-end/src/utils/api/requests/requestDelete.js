import axios from 'axios';

const requestDelete = async (body) => {
  try {
    console.log(body);
    const { token } = JSON.parse(localStorage.getItem('user'));
    await axios.delete('http://localhost:3001/register/adm', {
      headers: {
        Authorization: token,
      },
      data: body,
    });
  } catch (err) {
    console.error(err);
  }
};

export default requestDelete;
