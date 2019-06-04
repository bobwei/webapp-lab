import * as R from 'ramda';
import axios from 'axios';

import getEdges from './getEdges';
import mapEdgeToPhoto from './mapEdgeToPhoto';

const fn = ({ id } = {}) => {
  // prettier-ignore
  return axios
    .get(`/proxy/www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a&variables={"id":"${id}","first":12}`)
    .then(R.path(['data']))
    .then(R.pipe(getEdges, R.map(mapEdgeToPhoto)));
};

export default fn;
