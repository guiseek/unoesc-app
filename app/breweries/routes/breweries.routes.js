'use strict';

module.exports = function(api) {
    var breweries = require('../controllers/breweries.controller');
    
    api.route('/breweries')
        .get(breweries.findAll);
}