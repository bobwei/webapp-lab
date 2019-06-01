import * as R from 'ramda';
import axios from 'axios';

const fn = ({ query } = {}) => {
  // prettier-ignore
  return axios
    .get(`/proxy/web/search/topsearch/?query=${query}`)
    .then(R.path(['data']))
    .then(R.pipe(R.path(['users']), R.map(R.prop('user'))))
    .then(
      R.map(
        R.applySpec({
          value: R.prop('pk'),
          label: R.prop('username')
        }),
      )
    )
};

export default fn;
