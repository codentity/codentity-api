'use strict';

let path = require('path');
let fs = require('fs');
let CodentityPackages = require('codentity-packages');

let PACKAGES = CodentityPackages.loadSync();

module.exports = {
  getImage: function (request, reply) {
    let imagePath = CodentityPackages.getImageFilePath(request.params.id);
    reply.file(imagePath);
  },
  getPackageInfo: function (request, reply) {
    let match = PACKAGES.filter(function (pkg) {
      return pkg.id ===  request.params.id;
    }).map(mapImageUrl(request));
    if (match.length) return reply(match[0]);
    else return reply({ message: 'Unable to find package' }).code(404);
  },
  list: function (request, reply) {
    reply(PACKAGES.map(mapImageUrl(request)))
    .header('total-items', PACKAGES.length);
  }
};

function mapImageUrl (request) {
  return function (pkg) {
    pkg.imageUrl = `${request.server.info.uri}/packages/${pkg.id}/icon.png`;
    return pkg;
  }
}
