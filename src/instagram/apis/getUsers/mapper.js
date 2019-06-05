/* eslint-disable camelcase */
import * as R from 'ramda';

const fn = R.pipe(
  R.prop('user'),
  R.converge(R.merge, [
    R.identity,
    R.applySpec({
      value: R.prop('pk'),
      label: ({ username, full_name }) => `${username} ( ${full_name} )`,
    }),
  ]),
);

export default fn;
