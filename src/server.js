/******************** ***********************/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRouter = require("./app/routes/user_route");

/********************* Connect Db **********************/
require('./connection/connectDB.JS');

/*********************  **********************/
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


/********************* Use Routers **********************/
app.use("/api/",userRouter);

/*********************  **********************/
const PORT = process.env.my_port


/********************* Appp listen  **********************/
app.listen(PORT,(err)=>{
    if (err) console.log("Server Eror ##########",err);
    else console.log(`Server listen at port ${PORT}`);
});

