import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response;
};

export const getLogin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    username: username,
    password: password,
  });
  if (response.data.code == 1) {
    return true;
  }
  return false;
};

export const placeOrder = async (
  order_number,
  username,
  password,
  order_unit_list,
  cost_list,
  mobile_number,
  recipient_name,
  recipient_email,
  street,
  city,
  state,
  product_id_list
) => {
  const response = await axios.post(`${BASE_URL}/place_order`, {
    order_number: order_number,
    username: username,
    password: password,
    order_unit_list: order_unit_list,
    cost_list: cost_list,
    mobile_number: mobile_number,
    recipient_name: recipient_name,
    recipient_email: recipient_email,
    street: street,
    city: city,
    state: state,
    product_id_list: product_id_list,
  });
  console.log('response', response);
};

export const getOrderHistory = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/history`, {
    username: username,
    password: password,
  });
  return response;
};
