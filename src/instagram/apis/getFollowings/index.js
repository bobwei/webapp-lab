import * as R from 'ramda';
import axios from 'axios';

import mapper from './mapper';

const fn = ({ id }) => {
  const url = `/proxy/www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"${id}","include_reel":true,"fetch_mutual":false,"first":12}`;
  return axios
    .get(url, { withCredentials: true })
    .then(R.path(['data']))
    .then(R.path(['data', 'user', 'edge_follow', 'edges']))
    .then(R.map(mapper));
};

export default fn;
