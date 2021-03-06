const express = require('express');
const cache = require('./cache');
const _ = require('lodash');

const app = express();
const port = 3000;

app.get('/healthcheck', async (req, res) => {
  return res.status(200).send('OK');
});

app.get('/*', async (req, res) => {
   console.log("path:"+req.path);
  // Validate stream.
  const pathParts = _.split(_.trim(req.path, '/'), '/');
  const streamName = _.nth(pathParts, 0);
  const serverAddress = await cache.get(streamName);
  if (_.isNil(serverAddress)) {
    return res.status(404).send(`${streamName} is not streaming live now`);
  }
  const internalRedirect = `/${_.join(_.concat([serverAddress], pathParts), '/')}`;
  console.log(internalRedirect);
  res.set('X-Accel-Redirect', internalRedirect);
  return res.send();
});

app.listen(port, () => console.log(`origin app server listening at http://localhost:${port}`));