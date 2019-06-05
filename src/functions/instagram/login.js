/* eslint-disable camelcase */
import axios from 'axios';
import querystring from 'query-string';

const fn = (data) => {
  const postData = querystring.stringify({
    ...data,
    queryParams: '{"source":"auth_switcher"}',
    optIntoOneTap: true,
  });
  // prettier-ignore
  return axios
    .post('/proxy/www.instagram.com/accounts/login/ajax/', postData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    });
};

export default fn;
