const express = require('express');
const next = require('next');
const proxyApp = require('./proxy');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// prettier-ignore
nextApp
  .prepare()
  .then(() => {
    const app = express();

    app.use('/proxy', proxyApp);
    app.all('*', handle);

    app.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });

    return app;
  });
