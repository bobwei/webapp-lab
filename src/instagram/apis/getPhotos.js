import * as R from 'ramda';
import axios from 'axios';

import mapEdgeToPhoto from '../mappers/mapEdgeToPhoto';

const fn = ({ id } = {}) => {
  const url = `/proxy/www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a&variables={"id":"${id}","first":12}`;
  return axios
    .get(url, { withCredentials: true })
    .then(R.path(['data']))
    .then(
      R.pipe(
        R.path(['data', 'user', 'edge_owner_to_timeline_media', 'edges']),
        R.map(mapEdgeToPhoto),
      ),
    );
};

export default fn;
