const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var wealthFormSchema = new mongoose.Schema({
    income: {
        type: String,
        required: 'income can\'t be empty'
    },
    expenses : {
        type: String,
        required: 'expenses can\'t be empty'
    },
    insurance : {
        type: String
    },
    investment : {
        type: String
    },
    nominees : {
        type: String
    },
    address : {
        type: String
    },
    location : [{
        latitude : String,
        longitude : String
         }],
    userId : ObjectId
    
});
wealthFormSchema.index({income: 'text',expenses:'text',insurance: 'text'});


mongoose.model('WealthForm', wealthFormSchema);

