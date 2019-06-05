import * as R from 'ramda';
import axios from 'axios';

import mapper from './mapper';

const fn = ({ id } = {}) => {
  const url = `/proxy/www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a&variables={"id":"${id}","first":12}`;
  return axios
    .get(url, { withCredentials: true })
    .then(R.path(['data']))
    .then(R.path(['data', 'user', 'edge_owner_to_timeline_media', 'edges']))
    .then(R.map(mapper));
};

export default fn;
