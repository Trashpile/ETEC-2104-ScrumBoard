"use strict";

$(document).ready( () => { 
   
});

class Comment {
    constructor() {
        this.author;
        this.dateCreated;
        this.text;
        this.commentID;
        this.replyIDs;
    }
}
var fooCommentArray = [];

// placeholder functions
function postNewComment() {
    var x = document.getElementById('commentText').value;
    document.getElementById("display").innerHTML = x;   // placeholder return
    // TODO - create a new Comment class instance, append it to an array of Comment objects
}
function renderComments() {
    // TODO - render each Comment in Comment array
}