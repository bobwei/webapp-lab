/* eslint-disable no-param-reassign, no-unused-vars */

const fn = (proxyRes, req, res) => {
  const key = 'set-cookie';
  proxyRes.headers[key] = proxyRes.headers[key].map((value) => {
    return value.replace(' Domain=.instagram.com;', '');
  });
};

module.exports = fn;
