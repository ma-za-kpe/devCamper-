const NodeGeocoder = require('node-geocoder');

const dotenv = require('dotenv');

// Load env vars
dotenv.config({
    path: __dirname + '/.env'
});

console.log("In geocoder...provider is ..." + process.env.GEOCODER_PROVIDER + "  key is ..." + process.env.GEOCODER_API_KEY)

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'QMqDyyJSZDdijTZYJLqDwI75gYhqZdq7',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;