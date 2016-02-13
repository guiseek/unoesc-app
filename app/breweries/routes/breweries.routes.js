'use strict';

module.exports = function(api) {
    var breweries = require('../controllers/breweries.controller');
    
    api.route('/breweries')
        .get(breweries.findAll)
        .post(breweries.create);
        
    api.route('/breweries/:breweryId')
        .get(breweries.find)
        .put(breweries.update)
        .delete(breweries.delete);
        
    api.param('breweryId', breweries.breweryById);
}