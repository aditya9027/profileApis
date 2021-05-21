const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { msg } = require('../helpers/message');
const { users } = require('../models/user_model');
const  otp  = require('../helpers/otpGenerate');
const { sendLinkOnMail } = require('../helpers/emailSend');

const secretKey = process.env.JWT_SECRET_KEY


exports.userData = async (req)=>{
    let data = await users.find();
    return {
        response : data
    }
}

exports.userRegister = async (req)=>{
    let data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        mobile:req.body.mobile,
        countryCode:req.body.countryCode,
        gender:req.body.gender
    };

    if(data.email == null) throw { message:msg.emailNotExist };
    // console.log(data.email);

    let isMobileExist = await users.findOne( { mobile:data.mobile } ).lean();
    if(isMobileExist) throw { message : msg.mobileAlreadyExist };  //check if given number is already exist 

    let isEmailExist = await users.findOne( { email:data.email } ).lean();
    if(isEmailExist) throw { message : msg.emailAlreadyExist };

    let pass = await bcrypt.hash(data.password,10);
    data.password = pass;


    // let res = new users(data);
    // let result = await res.save();
    let result = await users.create(data);

    return {
        status: msg.success,
        message : msg.registerSuccess
    }

    // completed

}


exports.userLogin = async (req)=>{
    let data = {
        email: req.body.email,
        password :req.body.password
    }
    
    let findData = await users.findOne( {email:data.email} ).lean();
    if(findData == null ) throw { message : msg.emailNotExist }
    
    let compair = await bcrypt.compare(data.password,findData.password,)

    if(!compair) throw {message : msg.passwordNotMatch};

    // generate Token 
    let token = jwt.sign({
        id : findData._id,
        email : findData.email
    },secretKey,{
        expiresIn : '24h'
    });
    await users.findByIdAndUpdate({_id:findData._id}, {token:token} );
    
    findData.token = token;

    
    return  { 
        response : findData,
        message : msg.loginSuccess
    }

    // completed

}



exports.resetPassword = async (req)=>{
    // let data = req.body;
    let data = {
        oldPassword : req.body.oldPassword,
        newPassword : req.body.newPassword,
        confirmNewPassword : req.body.confirmNewPassword
    }

    if(data.oldPassword == null || data.newPassword == null  )
        throw { message : msg.passwordNotNull }

    if(data.newPassword !== data.confirmNewPassword) throw { message : msg.comfirmPasswordError }

    let savedData = await users.findById(req.params.id);
    if(savedData == null) throw { message : msg.userNotExist }

    // compair password
    let compair = await bcrypt.compare(data.oldPassword,savedData.password);

    if(!compair) throw { message:msg.passwordNotMatch };

    let pass = await bcrypt.hash(data.newPassword,10);

    saveData = await users.updateOne({_id:req.params.id},{$set:{password:pass}});

    return {
        status : msg.success,
        message : msg.passwordUpdated,
    }

    // completed

}


exports.forgetPassword = async (req)=>{
    let { email } = req.body;

    // find email and check that email exist or not 
    let findData = await users.findOne({email:email});
    if(findData == null) throw { message : msg.emailNotExist };

    // Generate Token 
    let token = jwt.sign({
        id : findData._id,
        email : email
    },process.env.JWT_SECRET_KEY,{
        expiresIn:'1h'
    });

    let option = {
        sendTo : email,
        token : token
    }

    let sendSuccess =await sendLinkOnMail(option);

    // console.log(sendSuccess);

    if(sendSuccess == null ) throw {
        message : msg.mailNotSend
    }

    let updatedData = await users.findOneAndUpdate(
        {
            _id:findData._id
        }, 
        {
            $set :{forgetInfo:{token:token,expToken:Date.now()+3600000}}
        });

    return {
        status:msg.success,
        message : msg.mailSendSuccess,
    }

    // completed
    

}

exports.forgetPasswordVarify = async (req)=>{
    let token = req.params.token;
    let { newPassword , confirmNewPassword } = req.body;

    if(newPassword !== confirmNewPassword) throw{ message : msg.passwordNotMatch }

    let decode = null; 
    jwt.verify(token,secretKey,(err,result)=>{
        if(err) throw{message : msg.linkExpire}
        decode = result
    });
 
    if(decode == null) throw { message : msg.linkExpire }
    
    let findData = await users.findOne({email:decode.email});
    if(findData == null || findData.forgetInfo.token !== token) throw { message : msg.linkExpire }

    let pass = await bcrypt.hash(newPassword,10);

    await users.findOneAndUpdate({email:decode.email},{$set:{password:pass,forgetInfo:{token:null,expToken:null}}})

    return {
        status : msg.success,
        message : msg.passwordUpdated,
    }

    // completed

}

exports.forgetPasswordReset = async (req)=>{
    let { email,password,newPassword } = req.body;

    let findData = await users.findOne({email:email});

    if(password === null || password === undefined || newPassword === null || newPassword === undefined) throw { message : msg.passwordNotBeNull }

    let pass = await bcrypt.hash(password,10);
    let updatedData = await users.findOneAndUpdate({email:email},{$set : {password:pass}});
    if(updatedData == null ) throw {
        message : "Data Not Updated"
    }

    return {
        message: "Data has been Updated ",
        response : true
    }
}



exports.deleteUser = async (req)=>{
    let  id  = req.params.id;
    if(!id) throw {
        message : "Don't get Id "
    }

    let response = await users.deleteOne({_id:id});
    if (!response) throw { message:"Not Deleted" }

    return {
        message : "deleted Successs"
    }

    // completed

}