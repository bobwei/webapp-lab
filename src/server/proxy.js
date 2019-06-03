const express = require('express');
const proxy = require('http-proxy-middleware');

const configs = [
  [
    '/proxy',
    {
      target: 'https://www.instagram.com',
      pathRewrite: { '^/proxy': '/' },
      changeOrigin: true,
    },
  ],
];

const app = express();

configs.reduce((acc, [key, config]) => acc.use(key, proxy(config)), app);

module.exports = app;
