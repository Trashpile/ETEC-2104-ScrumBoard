"use strict";
let fs = require("fs");
let formidable = require("formidable");
const session = require("express-session");
const bodyParser = require('body-parser')
let rand_users = require("./randUsers");

function editHierarchyMain(express_object, acc_manager) {
    let app = express_object;
    let acc = acc_manager;
    let sortType = "";
    let sortOrder = "";
    let oldType = "";
    let oldOrder = "";
    let hierarchyList = [];
    let parseL = [];
    app.set("view engine", 'ejs');

    let genUsers = true;
    if(genUsers){
        rand_users.randUsers(acc, 15);
    }
    
    app.get("/editHierarchy", (req, res) => {
        res.status(200).render("./templates/editHierarchy",
            { list: generate});
        

    });
    app.get("/sendHierarchy", (req, res) => {
        let data = req.originalUrl;
        let s = data.replace('%40', "@");
        parseFromURL(s);
        acc.setHierarchy(parseL[0], parseL[1]);
        //console.log(data);
        res.redirect("/editHierarchy");
    });

    app.get("/sendSort", (req, res) => {
        let data = req.originalUrl;
        parseFromURL(data);
        sortType = parseL[1];
        sortOrder = parseL[2];
        //console.log(parseL[0], parseL[1], parseL[2]);
        res.redirect("/editHierarchy");
    });

    function generate() {
        gatherAndSortUsers(sortType, sortOrder);
        let G = [];
        G.push("<div id='" + "line" + "hierarchy" + "'>");
        G.push("<form action ='/sendSort'>");
        G.push("<select name='sort' onchange='this.form.submit()'><option> Select an option to sort by...</option>");
        G.push("<option value='number*ascend'> Sort by #, Ascending</option>");
        G.push("<option value='number*descend'> Sort by #, Descending</option>");
        G.push("<option value='user*ascend'> Sort by User, Ascending</option>");
        G.push("<option value='user*descend'> Sort by User, Descending</option>");
        G.push("<option value='status*ascend'> Sort by Status, Ascending</option>");
        G.push("<option value='status*descend'> Sort by Status, Descending</option>");
        G.push("</select></form><p></p>");
        G.push("<table style='" + "width:50%'" + ">");
        G.push("<tr>" + "<th>#</th>" + "<th>User</th>" + "<th>Status</th>" + "<th>Edit</th>" + "</tr>");
        for (let line of hierarchyList) {
            G.push("<tr>");
            G.push("<td>" + line[0] + "</td>");
            G.push("<td>" + line[1] + "</td>");
            G.push("<td>" + line[2] + "</td>");
            G.push("<td>" + "<form action ='/sendHierarchy'>");
            G.push("<input type='radio' name='" + line[1] + "' value='user'> User");
            G.push("<input type='radio' name='" + line[1] + "' value='mod'> Mod");
            G.push("<input type='radio' name='" + line[1] + "' value='admin'> Admin");
            G.push("<input type='submit' value='Submit'></input>");
            G.push("</form>" + "</tr>");
        }
        G.push("</table>");
        G.push("</div>");
        return G.join("\n");
    };

    function parseFromURL(string){
        parseL = [];
        let s = string;
        let first = "";
        let second = "";
        let third = "";
        let fFlag = false;
        let sFlag = false;
        let tFlag = false;
        for(let i = 0; i<s.length; i++){
            if(fFlag && !sFlag && !tFlag && s[i] != '=')
                first += s[i];
            if(sFlag && !tFlag && s[i] != '*')
                second += s[i];
            if(tFlag)
                third += s[i];

            if(s[i] == '?')
                fFlag = true;
            if(s[i] == '=')
                sFlag = true;
            if(s[i] == '*')
                tFlag = true;
        }
        parseL.push(first);
        parseL.push(second);
        parseL.push(third);
    }

    function gatherAndSortUsers(type="number", order="ascend"){
        hierarchyList = []
        let tempList = [];
        let L = hierarchyList;
        let num = 0;

        // todo: factor this out
        for (let user of acc.accounts.values()) {
            num += 1;
            hierarchyList.push([num, user.username, user.hierarchy]);
        }
        // BIG FOR
        for(let s=0; s<L.length; s++){
            for(let i=0; i<L.length - 1; i++){
                let j = i + 1;
                if(type == "number"){
                    if(order == "ascend"){
                        if(L[i][0] > L[j][0]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                
                    else if(order == "descend"){
                        if(L[i][0] < L[j][0]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                }
                else if(type == "user"){
                    if(order == "ascend"){
                        if(L[i][1] > L[j][1]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                
                    else if(order == "descend"){
                        if(L[i][1] < L[j][1]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                }
                else if(type == "status"){
                    if(order == "ascend"){
                        if(L[i][2] < L[j][2]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                
                    else if(order == "descend"){
                        if(L[i][2] > L[j][2]){
                            tempList[0] = L[j];
                            L[j] = L[i];
                            L[i] = tempList[0];
                        }
                    }
                }
            }
        }
        hierarchyList = L;
    };

};

exports.editHierarchyMain = editHierarchyMain;