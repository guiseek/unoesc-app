'use strict';

var mongoose = require('mongoose'),
    Beer = require('../models/beer.model');

exports.findAll = function(req, res) {
    Beer.find({}).populate('brewery').exec(function(err, beers) {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(beers);
        }
    });
};
exports.find = function(req, res) {
    res.json(req.beer);
};
exports.create = function(req, res) {
    var beer = new Beer(req.body);
    beer.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cerveja criada com sucesso',
                beer: beer
            });
        }
    });
};
exports.update = function(req, res) {
    var beer = req.beer;
    beer.name = req.body.name;
    beer.description = req.body.description;
    beer.brewery = req.body.brewery;
    beer.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cerveja alterada com sucesso',
                beer: beer
            });
        }
    });
};
exports.delete = function(req, res) {
    var beer = req.beer;
    beer.remove(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Cerveja removida com sucesso',
                beer: beer
            });
        }
    });
};
exports.beerById = function(req, res, next, beerId) {
    if (!mongoose.Types.ObjectId.isValid(beerId)) {
        res.status(400).json({
            message: 'Cerveja inválida'
        })
    }
    Beer.findById(beerId).populate('brewery').exec(function(err, beer) {
        if (err) {
            res.status(404).json(err);
        }
        req.beer = beer;
        next();
    });
}