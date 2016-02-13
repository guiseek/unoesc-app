'use strict';

var mongoose = require('mongoose'),
    Brewery = require('../models/brewery.model');

exports.findAll = function(req, res) {
    Brewery.find({}).exec(function(err, breweries) {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(breweries);
        }
    });
};