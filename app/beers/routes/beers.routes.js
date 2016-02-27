'use strict';

var auth = require('../../users/controllers/auth.controller');

module.exports = function(api) {
    var beers = require('../controllers/beers.controller');
    
    api.use(auth.validateToken);
    
    api.route('/beers')
        .get(beers.findAll)
        .post(beers.create);
        
    api.route('/beers/:beerId')
        .get(beers.find)
        .put(beers.update)
        .delete(beers.delete);
        
    api.param('beerId', beers.beerById);
}