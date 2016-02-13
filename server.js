'use strict';

var config = require('./config/config'),
    mongoose = require('mongoose');

var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('Não foi possível conectar ao mongodb');
        console.log(err);
    }
});
