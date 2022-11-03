const requestUser = async () => {
  const payload = { email, password };
  try {
    const URL = 'http://localhost:3001/login';
    const response = await axios.post(URL, payload);
    setDisplay(false);
    return response.data.data;
  } catch (error) {
    console.log(error);
    setDisplay(true);
  }
};

export default requestUser;
