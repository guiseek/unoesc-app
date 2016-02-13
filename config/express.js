'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config');

module.exports = function(db) {
    var app = express();
    
    return app;
}