const mongoose = require('mongoose');
require('dotenv').config();

// ..............................
let url = process.env.DB_LOCAL_URL 
// let db = process.env.DB_LOCAL_DATABASE

mongoose.connect(url,{
    useUnifiedTopology:true,
    useNewUrlParser : true
});

let con = mongoose.connection

con.on('open',(err)=>{
    if (err) console.log("database not connected .....",err);
    else console.log("Database Connected ........");
});

module.exports = con;