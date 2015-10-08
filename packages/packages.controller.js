'use strict';

let Github = require('../lib/Github');

module.exports = {
  getImage: function (request, reply) {
    let github = getGithubInstance(request);
    var imageUrl = github.getImageUrl(request.params.id);
    reply.redirect(imageUrl);
  },
  getPackageInfo: function (request, reply) {
    let github = getGithubInstance(request);
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
    let github = getGithubInstance(request);
    github.getPackages()
    .then(function (packages) {
      reply(packages)
      .header('total-items', packages.length);
    })
    .catch(function (err) {
      reply({ message: err.message })
      .code(err.statusCode || 500);
    });
  }
};

function getGithubInstance (request) {
  var baseUrl = `${request.server.info.protocol}://${request.info.host}`;
  return new Github({ baseUrl: baseUrl });
}
