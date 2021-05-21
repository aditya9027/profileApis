const { Router } = require('express');
const express = require('express');
const route = express.Router();

// const { userData,userRegister,userLogin,resetPassword } = require('../controller/user_controller');
const user_controller = require('../controller/user_controller');

route.get("/userData",user_controller.userData);      // get all user data   completed
route.post("/userRegister",user_controller.userRegister);     // user Register is Completed
route.post("/userLogin",user_controller.userLogin);                // user login is completed
route.patch("/resetPassword/:id",user_controller.resetPassword);     // completed
route.post("/forgetPassword",user_controller.forgetPassword);       // completed
route.post("/forgetPassword/:token",user_controller.forgetPasswordVarify);  // completed

route.post("/forgetPasswordReset");
route.delete('/deleteUser/:id',user_controller.deleteUser);

route.post('/dfdf',(req,res)=>{
    resp.writeHead(200, { 'header1' : 'value1', header2: 'value2'});
    // res.writeHead(200,{'content-type':"text/json"});
    // res.setHeader("content-type",'application/json');
})


module.exports = route;