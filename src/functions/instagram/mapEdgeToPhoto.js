import * as R from 'ramda';

const fn = R.applySpec({
  src: R.path(['node', 'thumbnail_src']),
  caption: R.path(['node', 'edge_media_to_caption', 'edges', 0, 'node', 'text']),
  location: R.path(['node', 'location']),
  url: R.pipe(
    R.path(['node', 'shortcode']),
    R.concat('https://instagram.com/p/'),
  ),
});

export default fn;
