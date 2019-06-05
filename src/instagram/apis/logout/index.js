/* eslint-disable camelcase */
import axios from 'axios';
import querystring from 'query-string';

const fn = () => {
  const postData = querystring.stringify({
    one_tap_app_login: true,
  });
  // prettier-ignore
  return axios
    .post('/proxy/www.instagram.com/accounts/logout/ajax/', postData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    });
};

export default fn;
