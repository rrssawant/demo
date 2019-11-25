const mongoose = require('mongoose');

var marketDataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description : {
        type: String,
    },
    type : {
        type: String
    },
    amount : {
        type: String
    }
});
// volunteeringSchema.index({email: 'text'});
marketDataSchema.index({name: 'text',type: 'text',amount: 'text'});


mongoose.model('MarketData', marketDataSchema);

