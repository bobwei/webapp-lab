/* eslint-disable camelcase */
import axios from 'axios';

const fn = (data) => {
  return axios.post('/proxy/www.instagram.com/accounts/login/ajax/', data);
};

export default fn;
