'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    cors = require('cors');

module.exports = function(db) {
    var app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
    
    var api = express.Router();
    require('../app/core/routes/core.routes')(api);
    require('../app/breweries/routes/breweries.routes')(api);
    require('../app/beers/routes/beers.routes')(api);
    require('../app/users/routes/users.routes')(api);
    
    app.use('/api', api);
    
    return app;
}