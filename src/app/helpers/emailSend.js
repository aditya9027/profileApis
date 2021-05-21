var nodemailer = require('nodemailer');
var sendGridTransport = require('nodemailer-sendgrid-transport');


let api_key = process.env.SENDGRID_APIKEY;

let transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
      api_key:api_key
  }  
}));



 
exports.sendLinkOnMail = async (option)=>{

  let options = {
    from : "no.replay9027@gmail.com",
    to : option.sendTo,
    subject : "Forget Password",
    html : `<strong>Please Click to this <a href="http//localhost:4200/profile/forgetVarifyPassword/${option.token}">link<a> for change the password</strong>`
  }

  let sendMail = new Promise((resolve,reject)=>{
    transporter.sendMail(options,(err,info)=>{
      if(err) return reject(false);
      // console.log("Send Success");
      return resolve(true);
    })
  });

  let isSend = await sendMail;

  return isSend

}


// exports.sendLinkOnMail = async (option)=>{
//   sgMail.setApiKey(api_key);

//   let msg = {
//     from: 'no.replay9027@gmail.com',
//     to: option.sendTo,
//     subject: 'Forget Password',
//     text: '',
//     html: `<strong>Please Click to this <a href="localhost:4000/api/forgetPassword/${option.token}">link<a> for change the password</strong>`,
//   };
//   let sendMail = async function(){
//     try {
//       let isTrue =  await sgMail.send(msg,(err,result)=>{
//             if(err) {
//               console.log("Error 1");
//               console.log(err);
//               console.log(isTrue);
//               // return false
//             }else{
//               console.log("result");
//               // console.log(result)
//               console.log(isTrue);
//               // return true
//             }
//         })
//     } catch (error) {
//         console.log("Error 2");
//         console.log(error)
//     }
//   }

//   let isTrue1 = await sendMail();
//   console.log(isTrue1);

//   return isTrue1;

// }
