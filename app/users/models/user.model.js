'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
});

// BrewerySchema.pre('save', function(next) {
//     var brewery = this;
//     if (this.isNew) {
//         brewery.created = new Date();
//     }
//     brewery.updated = new Date();
//     next();
// });

module.exports = mongoose.model('User', UserSchema);