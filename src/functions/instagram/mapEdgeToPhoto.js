import * as R from 'ramda';

const fn = R.applySpec({
  src: R.path(['node', 'thumbnail_src']),
});

export default fn;
