const expressAsyncHandler=require('express-async-handler');
const nodemailer=require('nodemailer');

let auth=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 3000,
    secure: false,
    port: 587,
    auth:{
        user: "anuragmiglani15@gmail.com",
        pass: "brofmwsrfwhkzjtm"
    },
});
const sendEmail=expressAsyncHandler(async(req,res)=>{
    const{email}=req.body;
    var mailOptions={
        from: "anuragmiglani15@gmail.com",
        to: email,
        subject: "POS System",
        message:"Your Order has been created successfully!"
    };
    auth.sendMail(mailOptions,function(error,info){
         if(error){
            console.log(error);
         }else{
            console.log("Email sent Successfully");
         }
    })
});
module.exports={sendEmail};