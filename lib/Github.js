'use strict';

let Request = require('Request');

const REPO = 'codentity/codentity-packages';
const RAW_URL = `https://raw.githubusercontent.com/${REPO}/master/packages`;
const CONTENTS_URL = `https://api.github.com/repos/${REPO}/contents/packages`;

class Github {
  constructor (options) {
    options = options || {};
    this.baseUrl = options.baseUrl;
  }
  getPackages () {
    return this._getPackageIndex()
    .then((packages) => {
      return Promise.all(packages.map((pkg) => {
        return this.getPackageConfig(pkg.name);
      }));
    });
  }
  getImageUrl (pkgName) {
    return `${RAW_URL}/${pkgName}/icon.png`;
  }
  getPackageConfig (pkgName) {
    return this._getFromApi(`${RAW_URL}/${pkgName}/config.json`)
    .then((config) => {
      config.id = pkgName;
      config.url = `${this.baseUrl}/packages/${pkgName}`;
      config.imageUrl = this.getImageUrl(pkgName);
      return config;
    });
  }
  _getPackageIndex (pkgName) {
    return this._getFromApi(CONTENTS_URL);
  }
  _getFromApi (url) {
    return Request.get(url);
  }
}

module.exports = Github;
