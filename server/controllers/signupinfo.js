/**
 * Company Name - Intelegain Technologies
 */

const mongoose = require('mongoose')
const LoginInfo = mongoose.model('LoginInfo')
// const Volunteering =   mongoose.model('Volunteering');
const nodemailer = require("nodemailer");
var ObjectId = mongoose.Types.ObjectId;

// ** OTP send api ** // 

/**  Request Body 
 {	
	"email":  "rohan.sawant0106@gmail.com",
	"fullName" : "rohan"
} 
 * 
 */

module.exports.otpLogin = (req,res,next) => {
    var loginInfo = new LoginInfo();
    loginInfo.email = req.body.email;
    loginInfo.fullName = req.body.fullName;
    loginInfo.otp =  Math.floor(100000 + Math.random() * 900000);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'smtptest@dweb.in',
            pass: 'Dynamic@123'
        },
        tls: {
            rejectUnauthorized: false
        }
    
    });
    
    var mailOptions = {
        from: 'smtptest@dweb.in',
        to:  req.body.email,
        subject: 'Otp login',
        html: `Welcome , Your OTP is `+loginInfo.otp
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return res.status(500).json({ status: false, data: "something went wrong" });
        } else {
            LoginInfo.find({ email :req.body.email}).then((data) =>{
                
                if(data.length >0 ){
                    let loginData =data[0]
                    LoginInfo.update(
                        { email: req.body.email },
                        {
                            $set: { otp: loginInfo.otp}
                        }
                    ).then( data =>{
                        return  res.status(200).json({ status: true, data: loginData ,message: 'Otp send please check mail'})
                    }).catch(err =>{
                        return res.status(500).json({ status: false, data: "something went wrong" });
                    }); 


                }else{
                    loginInfo.save().then( data =>{
                        // console.log(data)
                        return  res.status(200).json({ status: true, data: data })
                    }).catch(err =>{
                        return res.status(500).json({ status: false, data: "something went wrong" });
                    }); 
                }
            }).catch((err) =>{
                return res.status(500).json({ status: false, data: "something went wrong" });
            });

        }
    });
}

// **  verify OTP api  ** //

/**  Request Body 
 {	
	"fullName": "rohan",
	"email": "rohan.sawant0106@gmail.com",
	"id": "5dd6411a6e5aaf3a526d9b0c",
	"otp": "481781"
}
 * 
 */

module.exports.verifyOtp = (req,res,next) => {
    if (!ObjectId.isValid(req.body.id))
    return res.status(400).json({ status: false, message: `invalid ID`});
          
    LoginInfo.find({ otp :req.body.otp, _id: ObjectId(req.body.id)}).then((data) =>{
        if(data.length > 0){
            return res.status(200).json({ status: true, data: data , message : "Login successfully" });
        }else{
            return res.status(200).json({ status: false ,  message : "wrong otp" });
        }
    }).catch((err) =>{
        return res.status(500).json({ status: false, data: "something went wrong" });
    });

}