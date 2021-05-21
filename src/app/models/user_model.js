const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{ type:String },
    email:{ type:String },
    password:{ type:String },
    mobile:{ type:Number },
    countryCode:{ type:String },
    gender:{ type:Number }, // 0 for male, 1 for female and 2 

    forgetInfo : { token : String, expToken : Date },    
    token:{ type:String },
    deviceType: { type: Number }, // 0 for Android, 1 for IOS
    lastLoginDate: { type:Date }
    
},{
    timestamps: true,
    versionKey: false,  
});

const users = mongoose.model('users',userSchema);

module.exports = {users};
