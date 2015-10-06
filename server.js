'use strict';

let Hapi = require('hapi');
let server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 9010,
  host: 'localhost'
});

require('./packages/packages.router')(server);

server.start(function (err) {
  console.log('Server listening on', server.info.uri);
});
