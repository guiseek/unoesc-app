'use strict';

module.exports = function(api) {
    var core = require('../controllers/core.controller');
    api.route('/').get(core.index);
}