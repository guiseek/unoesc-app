'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BeerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    brewery: {
        type: Schema.ObjectId,
        ref: 'Brewery'
    }
});

BeerSchema.pre('save', function(next) {
    var beer = this;
    if (this.isNew) {
        beer.created = new Date();
    }
    beer.updated = new Date();
    next();
});

module.exports = mongoose.model('Beer', BeerSchema);