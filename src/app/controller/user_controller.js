const { userData,
    userRegister,
    userLogin,
    resetPassword, 
    varifyPassword, 
    forgetPassword, 
    forgetPasswordVarify,
    forgetPasswordReset ,
    deleteUser
} = require('../business/user_business');

exports.userData = async  (req,res)=>{
    try {
        let data = await userData(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.userRegister = async (req,res)=>{
    try {
        let data = await userRegister(req);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error **** ",error);
        res.status(400).send(error);
    }
}

exports.userLogin = async (req,res)=>{
    try {
        let data = await userLogin(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.resetPassword = async (req,res)=>{
    try {
        let data = await resetPassword(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);        
    }
}


exports.forgetPassword = async (req,res)=>{
    try {
       let data = await forgetPassword(req);
       res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
}

exports.forgetPasswordVarify = async (req,res)=>{
    try {
        let data = await forgetPasswordVarify(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}

exports.forgetPasswordReset = async (req,res)=>{
    try {
        let data = await forgetPasswordReset(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.deleteUser = async (req,res)=>{
    try {
        let data = await deleteUser(req);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
        
    }
}