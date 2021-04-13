"use strict";
let express=require('express');
let AccountManager = require("./AccountManager");
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

let accountManager = new AccountManager.AccountManager();

app.use( express.static( "pub" ) );
app.get("/", (req,res) => { res.redirect("/pub/index.html"); });
app.get('/send',function(req,res){
    let temp = Math.random().toString(16).substr(2, 8);
    accountManager.addAccount("rcjohnson169@gmail.com","password1") // testing
    console.log(accountManager.accounts.get("rcjohnson169@gmail.com").id)
    if(accountManager.accounts.has(req.query.to)){
            let mailOptions={
                to :  req.query.to,
                subject : "Temporary Password",
                text : "Your temporary password is ".concat(temp) 
            }
            accountManager.setPassword(req.query.to, temp);
            console.log(accountManager.accounts.get("rcjohnson169@gmail.com").id);
        
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
    }
    else{
        console.log("email is not a user.")
    }
});



app.listen(2021);
console.log("Listening on 2021");