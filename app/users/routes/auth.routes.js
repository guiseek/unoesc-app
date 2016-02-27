'use strict';

module.exports = function(api) {
    var auth = require('../controllers/auth.controller');
    
    api.route('/login')
        .post(auth.login);        
}