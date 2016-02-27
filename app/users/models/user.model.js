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
    },
    roles: {
        type: Array,
        default: ['user']
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        user.password = user.password;
        //TODO usar lib bcryptjs para criptografar senha
    }
    next();
});

UserSchema.methods.comparePassword = function(passwd, callback) {
    //TODO implementar o bcrypt.compare
    if (passwd == this.password) {
        callback(true);
    } else {
        callback(false); 
    }
};

module.exports = mongoose.model('User', UserSchema);