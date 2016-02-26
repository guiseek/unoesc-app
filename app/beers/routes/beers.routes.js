'use strict';

module.exports = function(api) {
    var beers = require('../controllers/beers.controller');
    
    api.route('/beers')
        .get(beers.findAll)
        .post(beers.create);
        
    api.route('/beers/:beerId')
        .get(beers.find)
        .put(beers.update)
        .delete(beers.delete);
        
    api.param('beerId', beers.beerById);
}