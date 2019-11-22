const  mongoose = require('mongoose')
const WealthForm =   mongoose.model('WealthForm');
const SellerInfo = mongoose.model('SellerInfo');
var ObjectId = mongoose.Types.ObjectId;
const LoginInfo = mongoose.model('LoginInfo');


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


module.exports.sellerDataSave = (req,res,next) => {
    var sellerData = new SellerInfo();
    sellerData.sellerList = req.body.sellerList;
    sellerData.marketId = req.body.marketId;
    

    console.log(req.body.userId);

    sellerData.save().then( data =>{
        return res.status(200).json({ status: true, data: data ,message: 'Saved Succesfully' });
    }).catch(err => {
        return res.status(400).send(err);
    });
}



module.exports.searchData = (req,res,next) =>{
    // console.log(req.query.data)
    WealthForm.find({ $text: { $search: req.query.data}}).then(data => {
        console.log(data)
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(404).json({ status: false, message: 'Error in Retriving Resum.' });
        }
    }).catch(err =>{
        return res.status(404).json({ status: false, message: 'Error in Retriving Resum.' });

    }); 
}

module.exports.searchData = (req,res,next) =>{
    // console.log(req.query.data)
    WealthForm.find({ $text: { $search: req.query.data}}).then(data => {
        console.log(data)
        if (data) {
            return res.status(200).json({ status: true, data: data });
        } else {
            return res.status(404).json({ status: false, message: 'Error in Retriving Resum.' });
        }
    }).catch(err =>{
        return res.status(500).json({ status: false, message: 'Error in Retriving Resum.' });

    }); 
}


module.exports.getSellersData = (req,res,next) =>{
    // console.log(" req.query.data")
    SellerInfo.find({marketId : req.query.data }).then(data => {
        console.log(data)
        if(data.length === 0){
            return res.status(200).json({ status: false, data: "no record" });
        }
        return res.status(200).json({ status: true, data: data });
    }).catch(err =>{
        console.log(err)

        return res.status(500).json({ status: false, message: 'Error in Retriving Resum.' });
    });
     
}


