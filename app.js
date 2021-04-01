"use strict";
let express=require('express');
let nodemailer = require("nodemailer");
let app=express();
let smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "", // need to input an gmail and password to send that allows less secure apps.
        pass: ""
    }
});
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.use( express.static( "pub" ) );
app.get("/", (req,res) => { res.redirect("/pub/index.html"); });
app.get('/send',function(req,res){
    let mailOptions={
        to :  req.query.to,
        subject : "Temporary Password",
        text : "Your temporary password is EK48R21."
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
            console.log(error);
        res.end("error");
    }
    else{
        res.end("sent");
        }
    });
});



app.listen(2021);
console.log("Listening on 2021");