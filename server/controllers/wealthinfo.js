/**
 * Company Name - Intelegain Technologies
 */

const  mongoose = require('mongoose')
const WealthForm =   mongoose.model('WealthForm');
const SellerInfo = mongoose.model('SellerInfo');
const MarketData = mongoose.model('MarketData');


//   **  wealth form  add api   ** //

/**  Request Body 
 {
	"income": "1000",
	"expenses": "100",
	"insurance": "insurance",
	"investment": "investment",
	"nominees": "nominees",
	"location": [{
		"latitude" : "String",
        "longitude" : "String"
	}],
	"userId": "5dd69789d1ddb21f7b05e025"
}
 * 
 */

module.exports.wealthFormSave = (req,res,next) => {
    var wealthform = new WealthForm();
    wealthform.income = req.body.income;
    wealthform.expenses = req.body.expenses;
    wealthform.insurance = req.body.insurance;
    wealthform.investment = req.body.investment;
    wealthform.nominees = req.body.nominees;
    wealthform.location = req.body.location;
    wealthform.userId = req.body.userId;

    wealthform.save().then( data =>{
        return res.status(200).json({ status: true, data: data, message: 'Saved Succesfully' });
    }).catch(err => {
        return res.status(400).send(err);
    });
}

//   **  seller add api   ** //

// module.exports.sellerDataSave = (req,res,next) => {
//     var sellerData = new SellerInfo();
//     sellerData.sellerList = req.body.sellerList;
//     sellerData.marketId = req.body.marketId;
    
//     sellerData.save().then( data =>{
//         return res.status(200).json({ status: true, data: data ,message: 'Saved Succesfully' });
//     }).catch(err => {
//         return res.status(400).send(err);
//     });
// }



//   **  market add api   ** //

/**  Request Body 
 {
	"name": "mutual3",
	"description": "decription3",
	"type": "type 1",
	"amount": "2000"
}
 * 
 */

module.exports.marketDataSave = (req,res,next) => {
    var marketData = new MarketData();
    marketData.name = req.body.name;
    marketData.description = req.body.description;
    marketData.type = req.body.type;
    marketData.amount = req.body.amount;
    
    marketData.save().then( data =>{
        return res.status(200).json({ status: true, data: data ,message: 'Saved Succesfully' });
    }).catch(err => {
        return res.status(400).send(err);
    });
}

//   **  search  api   ** //


module.exports.searchData = (req,res,next) =>{
    MarketData.find({ $text: { $search: req.query.data}}).then(data => {
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(404).json({ status: false, message: 'Error in Retriving Resum.' });
        }
    }).catch(err =>{
        return res.status(404).json({ status: false, message: 'Error in Retriving Resum.' });

    }); 
}

//  ** get Seller data by id  ** //

module.exports.getSellersData = (req,res,next) =>{
    SellerInfo.find({marketId : req.query.data }).then(data => {
        if(data.length === 0){
            return res.status(200).json({ status: false, data: "no record" });
        }
        return res.status(200).json({ status: true, data: data });
    }).catch(err =>{
        return res.status(500).json({ status: false, message: 'Error in Retriving Resum.' });
    });
     
}


