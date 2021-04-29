"use strict";

//$(document).ready( () => { 
   
//});

class Comment {
    constructor(currentAuthor, currentDate, currentText, currentCID, nestValue=0) {
        this.author = currentAuthor;
        this.dateCreated = currentDate;
        this.text = currentText;
        this.commentID = currentCID;
        this.replyNestValue = nestValue;
        this.replyArray = [];
    }
}
var memeCommentArray = [];      // Every Comment object from users who commented on the meme itself [not replies!]
var newCID = 0;



function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function postNewComment() {
    let newText = document.getElementById("commentText").value;
    let currentDate = new Date();
    let commentDate = "".concat(String(currentDate.getMonth()), "/", String(currentDate.getDate()), "/", String(currentDate.getFullYear()));
    let x = new Comment("FooAuthor", commentDate, newText, newCID);   // Replace FooAuthor with actual account author
    memeCommentArray.push(x);
    newCID++;
    addHTMLtextElement(x);
    addHTMLbuttonElement(x);
}

function postReply(comment) {
    let newText = document.getElementById("commentText").value;
    let currentDate = new Date();
    let commentDate = "".concat(String(currentDate.getMonth()), "/", String(currentDate.getDate()), "/", String(currentDate.getFullYear()));
    let x = new Comment("FooAuthor", commentDate, newText, newCID, comment.replyNestValue + 1);   // Replace FooAuthor with actual account author
    comment.replyArray.push(x);
    newCID++;
    addHTMLtextElement(x);
    addHTMLbuttonElement(x);
}

//function editComment(comment) {
    
//}

function addHTMLtextElement(comment) {
    // create a new pre element
    const idPrefix = "CID_";
    const borderChar = "-";
    const borderCharBold = "=";
    var indentOffset = comment.replyNestValue * 5;
    const commentText = "".concat(" ".repeat(indentOffset), 
        "+", borderChar.repeat(comment.author.length + 2), "+", borderChar.repeat(12), "+\n", 
        " ".repeat(indentOffset), 
        "| ", comment.author, " | ", comment.dateCreated, " |\n", 
        " ".repeat(indentOffset), 
        borderCharBold.repeat(82), "\n", 
        " ".repeat(indentOffset), 
        comment.text, "\n", 
        " ".repeat(indentOffset), 
        borderCharBold.repeat(82), "\n");
    const newPre = document.createElement("pre");
    newPre.setAttribute("id", idPrefix.concat(String(comment.commentID)));


    const newContent = document.createTextNode(commentText);

    newPre.appendChild(newContent);

    const currentPre = document.getElementById("display");
    document.body.insertBefore(newPre, currentPre);  
}

function addHTMLbuttonElement(comment) {
    // create a new Button element
    const idPrefix = "BUTTON_";
    const newButton = document.createElement("button");
    newButton.setAttribute("id", idPrefix.concat(comment.commentID));
    newButton.textContent = "Reply";
    newButton.onclick = function(){postReply(comment)};

    const currentPre = document.getElementById("CID_".concat(comment.commentID));
    insertAfter(newButton, currentPre); 
}

