'use strict';

let Hapi = require('hapi');
let server = new Hapi.Server();
let packageJson = require('./package');

server.connection({
  port: process.env.PORT || 5000,
});

require('./packages/packages.router')(server);

server.route({
  path: '/',
  method: 'GET',
  handler: function (request, reply) {
    reply({
      name: packageJson.name,
      message: packageJson.description,
      version: packageJson.version,
      packagesUrl: `${request.server.info.protocol}://${request.info.host}/packages`
    });
  }
});

server.start(function (err) {
  console.log('Server listening on', server.info.uri);
});
