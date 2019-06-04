const express = require('express');
const proxy = require('http-proxy-middleware');
const handleInstagramCsrf = require('./instagram/csrf');
const handleInstagramCookie = require('./instagram/cookie');

const app = express();

app.use('/proxy/:hostname', (req, res, next) => {
  handleInstagramCsrf(req);
  const { hostname } = req.params;
  const handler = proxy({
    target: `https://${hostname}`,
    pathRewrite: { [`^/proxy/${hostname}`]: '/' },
    changeOrigin: true,
    onProxyRes: handleInstagramCookie,
  });
  handler(req, res, next);
});

module.exports = app;
