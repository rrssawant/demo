const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var sellerInfoSchema = new mongoose.Schema({
    sellerList : [{
        name : String,
        work : String
    }],
    marketId : ObjectId,
});


mongoose.model('SellerInfo', sellerInfoSchema);

