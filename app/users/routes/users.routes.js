'use strict';

var auth = require('../../users/controllers/auth.controller');

module.exports = function(api) {
    var users = require('../controllers/users.controller');
    
    api.use(auth.validateToken);
    
    api.route('/users')
        .get(users.findAll)
        .post(users.create);
        
    api.route('/users/:userId')
        .get(users.find)
        .put(users.update)
        .delete(users.delete);
        
    api.param('userId', users.userById);
}