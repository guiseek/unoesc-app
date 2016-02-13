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
exports.find = function(req, res) {
    res.json(req.brewery);
};
exports.create = function(req, res) {
    var brewery = new Brewery(req.body);
    brewery.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cervejaria criada com sucesso',
                brewery: brewery
            });
        }
    });
};
exports.update = function(req, res) {
    var brewery = req.brewery;
    brewery.name = req.body.name;
    brewery.description = req.body.description;
    brewery.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cervejaria alterada com sucesso',
                brewery: brewery
            });
        }
    });
};
exports.delete = function(req, res) {
    var brewery = req.brewery;
    brewery.remove(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cervejaria removida com sucesso',
                brewery: brewery
            });
        }
    });
};
exports.breweryById = function(req, res, next, breweryId) {
    if (!mongoose.Types.ObjectId.isValid(breweryId)) {
        res.status(400).json({
            message: 'Cervejaria inválida'
        })
    }
    Brewery.findById(breweryId).exec(function(err, brewery) {
        if (err) {
            res.status(404).json(err);
        }
        req.brewery = brewery;
        next();
    });
}