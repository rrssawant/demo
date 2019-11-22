const mongoose = require('mongoose');

var marketDataSchema = new mongoose.Schema({
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
    }
});
// volunteeringSchema.index({email: 'text'});


mongoose.model('MarketData', marketDataSchema);

