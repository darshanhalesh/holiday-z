const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: {
        type: String
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);

