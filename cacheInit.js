const nodeCache = require('node-cache');
const cache = new nodeCache({ stdTTL: 0, checkperiod: 600 });

module.exports = cache;
