"use strict";
console.log("Hello, world!");

let express = require("express");



let app = express();
app.use(express.static("pub"));
app.get("/", (req,res) => {res.redirect("/pub/commentBox.html");});
app.listen(2021);
console.log("Listening on 2021");