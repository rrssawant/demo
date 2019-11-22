const mongoose = require('mongoose')
const LoginInfo = mongoose.model('LoginInfo')
// const Volunteering =   mongoose.model('Volunteering');
const nodemailer = require("nodemailer");
var ObjectId = mongoose.Types.ObjectId;



module.exports.otpLogin = (req,res,next) => {
    console.log("hello")
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
        // console.log(error)
        if (error) {
            return res.status(500).json({ status: false, data: "something went wrong" });
        } else {
            // console.log(info)
            LoginInfo.find({ email :req.body.email}).then((data) =>{
                // console.log(data[0].id)
                
                if(data.length >0 ){
                    let loginData =data[0]
                    LoginInfo.update(
                        { email: req.body.email },
                        {
                            $set: { otp: loginInfo.otp, loginStatus : false}
                        }
                    ).then( data =>{
                        // console.log(data)
                        return  res.status(200).json({ status: true, data: loginData ,message: 'Otp send please check mail'})
                    }).catch(err =>{
                        return res.status(500).json({ status: false, data: "something went wrong" });
                    }); 


                }else{
                    console.log("ji")
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


        //     loginInfo.save().then( data =>{
        //             console.log(data)
        //             return  res.status(200).json({ status: true, data: data })
        //     }).catch(err =>{
        //         return res.status(500).json({ status: false, data: "something went wrong" });
        //     }); 
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
   
    // console.log(req.body.otp )
    LoginInfo.find({ otp :req.body.otp, _id: ObjectId(req.body.id)}).then((data) =>{
        console.log(data)
        if(data.length > 0){
            return res.status(200).json({ status: true, data: data });
        }else{
            return res.status(404).json({ status: false, data: "wrong otp" });
        }
    }).catch((err) =>{
        return res.status(500).json({ status: false, data: "something went wrong" });
    });

}