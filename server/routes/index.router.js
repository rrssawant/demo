const express = require('express');
const router = express.Router();


const ctrlWealthInfo = require('../controllers/wealthinfo');
const ctrlSignupInfo = require('../controllers/signupinfo');

//  ** demo testing route ** //
// router.get('/abc',function(req,res,next){
//     res.send("hi")
// })

router.post('/otpLogin',ctrlSignupInfo.otpLogin);
router.post('/verifyOtp',ctrlSignupInfo.verifyOtp);
router.post('/wealthFormSave',ctrlWealthInfo.wealthFormSave);
router.post('/marketDataSave',ctrlWealthInfo.marketDataSave);

router.get('/searchData',ctrlWealthInfo.searchData);
router.get('/getSellersData',ctrlWealthInfo.getSellersData);


module.exports = router;