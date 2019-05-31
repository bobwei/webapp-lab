/* eslint-disable import/no-dynamic-require */
import path from 'path';
import * as R from 'ramda';

const [, , dataPath] = process.argv;
const data = require(path.resolve(dataPath));

const result = R.pipe(
  R.path(['data', 'user', 'edge_owner_to_timeline_media', 'edges']),
  R.map(
    R.applySpec({
      src: R.path(['node', 'thumbnail_src']),
    }),
  ),
)(data);

console.log(JSON.stringify(result, null, 2));
