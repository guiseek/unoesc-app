'use strict';

var jwt = require('jsonwebtoken'),
    User = require('../models/user.model'),
    secret = 'secret-unoesc-app';

exports.login = function(req, res) {
    if (!req.body.email) {
        res.status(400).json({ message: 'Entre com um e-mail' });
    }
    if (!req.body.password) {
        res.status(400).json({ message: 'Entre com uma senha' });
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
        user.comparePassword(req.body.password, function(valid) {
            if (!valid) {
                res.status(401).json({ message: 'Falha na autenticação, tente novamente' });
            } else {
                var token = jwt.sign(user, secret);
                res.status(200).json({
                    user: user,
                    token: token
                });
            }
        });
    });
}
exports.validateToken = function(req, res, next) {
    var token = req.body.token || req.params.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).json({ message: 'Falha na validação do token' });
            } else {
                req.auth = decoded.doc;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Nenhum token fornecido' });
    }
}