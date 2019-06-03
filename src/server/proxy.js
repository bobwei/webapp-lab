const express = require('express');
const proxy = require('http-proxy-middleware');

const proxyConfig = {
  '/proxy': {
    target: 'https://www.instagram.com',
    pathRewrite: { '^/proxy': '/' },
    changeOrigin: true,
  },
};

const app = express();

// prettier-ignore
Object
  .entries(proxyConfig)
  .reduce((acc, [key, config]) => {
    return acc.use(key, proxy(config));
  }, app)

module.exports = app;
