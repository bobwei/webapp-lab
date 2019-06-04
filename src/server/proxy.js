const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/proxy/:hostname', (req, res, next) => {
  const { hostname } = req.params;
  const handler = proxy({
    target: `https://${hostname}`,
    pathRewrite: { [`^/proxy/${hostname}`]: '/' },
    changeOrigin: true,
  });
  handler(req, res, next);
});

module.exports = app;
