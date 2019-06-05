/* eslint-disable camelcase */
import * as R from 'ramda';
import axios from 'axios';

const fn = ({ query } = {}) => {
  // prettier-ignore
  return axios
    .get(`/proxy/web/search/topsearch/?query=${query}`, { withCredentials: true })
    .then(R.path(['data']))
    .then(R.pipe(R.path(['users']), R.map(R.prop('user'))))
    .then(
      R.map(
        R.converge(
          R.merge,
          [
            R.identity,
            R.applySpec({
              value: R.prop('pk'),
              label: ({ username, full_name }) => `${username} ( ${full_name} )`,
            }),
          ]
        )
      )
    )
};

export default fn;
