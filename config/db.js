// Bring Mongoose into the app 
var mongoose = require('mongoose');
const colors = require('colors');

// Build the connection string 
var dbURI = 'mongodb://localhost:27017/devCamper';

//db config
// const db = require('../config/Keys').MongoURI;

// Create the database connection 
// mongoose.connect(db || dbURI);

//connect to mongo
mongoose.connect(process.env.MONGODB_URI || dbURI, {
        useNewUrlParser: true
    })
    .then(console.log('mongoDB connected successfully...'.bgCyan.bold))
    .catch(err => console.log(err).red);

// module.exports = {
//     'JWT_SECRET': 'makusecretkey***',
//     'JTW_EXPT_TIME': '2m'
// };

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS 
require('../models/Bootcamp');