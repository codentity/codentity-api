'use strict';

const request = require('request');
const Cache = require('./Cache');

let cache = new Cache();

class Request {
  static get (url, ignoreCache) {
    return new Request().get(url, ignoreCache);
  }
  get (url, ignoreCache) {
    if (!ignoreCache) {
      let cachedData = cache.get(url);
      if (cachedData) return Promise.resolve(cachedData);
    }
    let config = {
      headers: {
        'User-Agent': 'codentity-api'
      },
      method: 'GET',
      url: url,
      json: true
    };
    return new Promise((resolve, reject) => {
      request(config, (err, response, body) => {
        if (err) return reject(err);
        if (this._isValidResponse(response)) {
          cache.add(url, body);
          return resolve(body);
        }
        return reject(this._getRejection(response, body));
      });
    });
  }
  _isValidResponse (response) {
    return (response.statusCode === 200 || response.statusCode === 304);
  }
  _getRejection (response, body) {
    let error = new Error(body.message || response.statusMessage);
    error.statusCode = response.statusCode;
    error.response = response;
  }
}

module.exports = Request;
