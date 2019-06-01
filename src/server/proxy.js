const express = require('express');
const proxy = require('http-proxy-middleware');

const proxyConfig = {
  target: 'https://www.instagram.com',
  pathRewrite: { '^/proxy': '/' },
  changeOrigin: true,
};

const app = express();

app.use(proxy(proxyConfig));

module.exports = app;
