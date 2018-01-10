var  mongoose             = require("mongoose"),
     passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
        username:String,
        firstname:String,
        lastname:String,
        code:String,
        password:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);
