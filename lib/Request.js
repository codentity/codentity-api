'use strict';

let request = require('request');

class Request {
  static get (url) {
    return new Request().get(url);
  }
  get (url) {
    let config = {
      headers: {
        'User-Agent': 'codentity-api'
      },
      method: 'GET',
      url: url,
      json: true
    };
    return new Promise((resolve, reject) => {
      request(config, function (err, response, body) {
        if (err) return reject(err);
        if (this._isValidResponse(response)) return resolve(body);
        return reject(this._parseReject(response, body));
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
