import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response;
};

export const getLogin = async (username, password) => {
  const response = await axios.get(`${BASE_URL}/login/username=${username}&password=${password}`);
  if (response.data.code == 1) {
    return true;
  }
  return false;
};
