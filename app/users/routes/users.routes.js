'use strict';

module.exports = function(api) {
    var users = require('../controllers/users.controller');
    
    api.route('/users')
        .get(users.findAll)
        .post(users.create);
        
    api.route('/users/:userId')
        .get(users.find)
        .put(users.update)
        .delete(users.delete);
        
    api.param('userId', users.userById);
}