var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
},{ collection: '_User', versionKey: false });

//Unique Validator
UserSchema.plugin(uniqueValidator,{ message: 'Error, expected {VALUE} to be unique.' });

//Remove the Password when returng the user object
UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj
};

//Encrypt user password
UserSchema.pre('save', function (next) {
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10,function (err,salt) {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password,salt,function (err,hash) {
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }else {
        return next();
    }
});

UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('email must be unique'));
    } else {
        next(error);
    }
});

UserSchema.methods.comparePassword = function (passw,cb) {
    bcrypt.compare(passw,this.password,function (err,isMatch) {
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};

var User = module.exports =  mongoose.model('_User', UserSchema);

/**
 * Functions conected to the User model
 * */
User.registerUser = function (req,callback) {
    User.create(req.body, callback);
};

User.listUsers = function (page = 0, callback) {
    User.find(callback);
};

User.getUser = function (req,callback) {
    User.findOne({'username':req.body.username},callback);
};