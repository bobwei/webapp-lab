/* eslint-disable no-param-reassign, no-unused-vars */

const fn = (proxyRes, req, res) => {
  const key = 'set-cookie';
  if (key in proxyRes.headers) {
    proxyRes.headers[key] = proxyRes.headers[key].map((value) => {
      return value
        .replace(' Domain=.instagram.com;', '')
        .replace(' Domain=instagram.com;', '')
        .replace(' Domain=.www.instagram.com;', '')
        .replace(' Domain=www.instagram.com;', '')
        .replace(' Domain=.i.instagram.com;', '')
        .replace(' Domain=i.instagram.com;', '')
        .replace(' Secure', '')
        .replace(' HttpOnly', '');
    });
  }
};

module.exports = fn;
