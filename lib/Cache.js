'use strict';

const DEFAULT_DURATION = process.env.CACHE_DURATION ?
                         parseInt(process.env.CACHE_DURATION, 10) : 60 * 1000;

class Cache {
  constructor (config) {
    config = config || {};
    this.duration = config.duration || DEFAULT_DURATION;
    this.cache = {};
  }
  add (key, data) {
    this.cache[key] = {
      timestamp: new Date(),
      data: data
    }
  }
  get (key) {
    let cache = this.cache[key];
    if (!cache) return;
    let now = new Date();
    if (now - cache.timestamp > this.duration) {
      delete this.cache[key];
    } else {
      return cache.data;
    }
  }
}

module.exports = Cache;
