/* eslint-disable dot-notation */
const fn = (req) => {
  if (req.params.hostname === 'www.instagram.com') {
    const csrftoken = 'G3ML0Vf5gdEowA4g8LcfH4Fw5ofx88Dx';
    req.headers['cookie'] = `csrftoken=${csrftoken};`;
    req.headers['x-csrftoken'] = csrftoken;
  }
};

module.exports = fn;
