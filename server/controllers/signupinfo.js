const mongoose = require('mongoose')
const LoginInfo = mongoose.model('LoginInfo')
// const Volunteering =   mongoose.model('Volunteering');
const nodemailer = require("nodemailer");
var ObjectId = mongoose.Types.ObjectId;



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
                            $set: { otp: loginInfo.otp, loginStatus : false}
                        }
                    ).then( data =>{
                        return  res.status(200).json({ status: true, data: loginData , message : 'OTP has been send to email' })
                    }).catch(err =>{
                        return res.status(500).json({ status: false, message: "something went wrong" });
                    }); 


                }else{
                           loginInfo.save().then( data =>{
                                return  res.status(200).json({ status: true, data: data , message : 'OTP has been send to email' })
                            }).catch(err =>{
                                return res.status(500).json({ status: false, message: "something went wrong" });
                            }); 
                }
            }).catch((err) =>{
                return res.status(500).json({ status: false, data: "something went wrong" });
            });

        }
    });
}


module.exports.verifyOtp = (req,res,next) => {
    if (!ObjectId.isValid(req.body.id))
    return res.status(400).json({ status: false, message: `invalid ID`});
          
    var loginData = {
        fullName : req.body.fullName,
        email : req.body.email,
    };
   
    LoginInfo.find({ otp :req.body.otp, _id: ObjectId(req.body.id)}).then((data) =>{
        if(data.length > 0){
            return res.status(200).json({ status: true, message: "successfully verified" });
        }else{
            return res.status(200).json({ status: false, message: "wrong otp" });
        }
    }).catch((err) =>{
        return res.status(500).json({ status: false, message: "something went wrong" });
    });

}