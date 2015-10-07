'use strict';

let Github = require('../lib/Github');

module.exports = {
  getImage: function (request, reply) {
    let github = new Github({
      baseUrl: request.info.host
    });
    var imageUrl = github.getImageUrl(request.params.id);
    reply.redirect(imageUrl);
  },
  getPackageInfo: function (request, reply) {
    let github = new Github({
      baseUrl: request.info.host
    });
    github.getPackageConfig(request.params.id)
    .then(function (config) {
      reply(config);
    })
    .catch(function (err) {
      reply({ message: err.message })
      .code(err.code || 500);
    });
  },
  list: function (request, reply) {
    console.log(request.info.host);
    let github = new Github({
      baseUrl: request.info.host
    });
    github.getPackages()
    .then(function (packages) {
      reply(packages)
      .header('total-items', packages.length);
    })
    .catch(function (err) {
      reply({ message: err.message })
      .code(err.code || 500);
    });
  }
};
