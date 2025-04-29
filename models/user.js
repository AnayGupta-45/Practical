const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isPatient: { type: Boolean, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true }
});

// Add username and password automatically
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
