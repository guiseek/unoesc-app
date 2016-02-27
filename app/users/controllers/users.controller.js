'use strict';

var mongoose = require('mongoose'),
    User = require('../models/user.model');

exports.findAll = function(req, res) {
    User.find({}).exec(function(err, users) {
        if (err) {
            console.error(err);
            res.status(400).json(err);
        } else {
            res.json(users);
        }
    });
};
exports.find = function(req, res) {
    res.json(req.user);
};
exports.create = function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Usuário criada com sucesso',
                user: user
            });
        }
    });
};
exports.update = function(req, res) {
    var user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Usuário alterada com sucesso',
                user: user
            });
        }
    });
};
exports.delete = function(req, res) {
    var user = req.user;
    user.remove(function(err) {
        if (err) {
            res.status(400).json({
                message: err
            });
        } else {
            res.json({
                message: 'Usuário removida com sucesso',
                user: user
            });
        }
    });
};
exports.userById = function(req, res, next, userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({
            message: 'Usuário inválida'
        })
    }
    User.findById(userId).exec(function(err, user) {
        if (err) {
            res.status(404).json(err);
        }
        req.user = user;
        next();
    });
}