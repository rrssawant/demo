const mongoose = require('mongoose');

var loginInfoSchema = new mongoose.Schema({
    fullName : {
        type: String,
    },
    email: {
        type: String,
    },
    otp : {
        type: String
    },
    loginStatus : {
        type: Boolean,
        default: false
    }
});


mongoose.model('LoginInfo', loginInfoSchema);

