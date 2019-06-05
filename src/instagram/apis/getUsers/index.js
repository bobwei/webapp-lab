import * as R from 'ramda';
import axios from 'axios';

import mapToUser from './mapper';

const fn = ({ query } = {}) => {
  return axios
    .get(`/proxy/www.instagram.com/web/search/topsearch/?query=${query}`, { withCredentials: true })
    .then(R.path(['data']))
    .then(R.path(['users']))
    .then(R.map(mapToUser));
};

export default fn;
