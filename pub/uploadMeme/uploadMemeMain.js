// In main.js...
// let upload_meme = require("./pub/uploadMeme/uploadMemeMain.js");
// under server Function... 
// upload_meme.uploadMemeMain(app); where app = express()
"use strict";
let fs = require("fs");
let formidable = require("formidable");
const session = require("express-session");
let AccountManager = require("../../AccountManager.js");

function uploadMemeMain(express_object){
    let uploadData = [];
    let app = express_object;
    app.set("view engine", 'ejs');
    
    app.use(session({
        resave:false,
        saveUninitialized: false,
        secret: "uploadMeme"
    }));

    let requireLogIn = true;
    if(requireLogIn){

        app.get("/setCookie?", (req,res) => {
            let loggedIn = req.query["loggedIn"]
            if (loggedIn === 'true'){
                req.session.regenerate( () => {
                    req.session.access = loggedIn;
                    res.send("OK");
                });
            }
            else
                res.status(403).send("Error: Not logged in.");
        });
    }

    app.get("/upload", (req,res) => {
        if(requireLogIn){
            console.log("       " + req.session.access)
            if (req.session && req.session.access){
                res.render("./templates/uploadMemeHTML");
                res.status(200);
            }
            else
                res.status(403).send("Error: Not logged in.");
        }
        else
        res.render("./templates/uploadMemeHTML");
        res.status(200);
        
    });

    app.post("/sendimage", (req, res) => {
        console.log("accessed server /sendimage");
        let A = formidable({
            maxFileSize: 1 * 1024 * 1024,
            multiples: false
        });

        A.parse (req, (err, fields, files) => {
            let image = fields["img"];
            let commaIndex = image.indexOf(",");
            image = image.substring(commaIndex + 1);
            let binaryData = Buffer.from(image, "base64");
            let sentSize = binaryData.byteLength;
            // console.log(binaryData[0]);
            // console.log(binaryData);
            let maxSize = A.maxFileSize;

            if (!checkFileType(binaryData) || sentSize > maxSize){
                res.send("error");
                res.status(409)
                console.log("Error: wrong file type or size.");
            }
            else{
                uploadData = []; // Empty?
                uploadData = binaryData;
                fs.writeFile("./error.png", binaryData, err, () =>{});
                
                
                console.log(uploadData);
                res.status(200);
                res.send("OK")
            }
        });

        function checkFileType(file){
            let buffer = [];
            let png = [137, 80, 78, 71];
            let gif =  [71, 73, 70, 56];
            let jpg = [255, 216, 255];

            let z = 4;
            if(file[0] === 255 && file[1] === 216 && file[2] === 255)
                z = 3;
            else
                z = 4;
            for(let i=0; i<z; i++){
                buffer[i] = file[i];
            }

            let buffer_b = Buffer.from(buffer);
            let buffer_p = Buffer.from(png);
            let buffer_g = Buffer.from(gif);
            let buffer_j = Buffer.from(jpg);
            //console.log(buffer);
            let a = Buffer.compare(buffer_b, buffer_p);
            let b = Buffer.compare(buffer_b, buffer_g);
            let c = Buffer.compare(buffer_b, buffer_j);
            if(!a || !b || !c)
                return true;
            
            else
                return false;
        }
    });
}
exports.uploadMemeMain = uploadMemeMain;