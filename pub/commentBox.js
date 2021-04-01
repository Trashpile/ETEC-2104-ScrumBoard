"use strict";

//$(document).ready( () => { 
   
//});

class Comment {
    constructor(currentAuthor, currentDate, currentText, currentCID) {
        this.author = currentAuthor;
        this.dateCreated = currentDate;
        this.text = currentText;
        this.commentID = currentCID;
        this.replyIDs = [];
    }
}
var memeCommentArray = [];      // Every Comment object from users who commented on the meme itself [not replies!]
var newCID = 0;

// placeholder functions
function postNewComment() {
    let newText = document.getElementById("commentText").value;
    //document.getElementById("display").innerHTML = newText;   // placeholder return
    // create a new Comment class instance, append it to an array of Comment objects
    let x = new Comment("FooAuthor", "FooDate", newText, newCID);   // Replace FooAuthor with actual account author
    let y = "";
    let z;
    let borderChar = "-"
    let borderCharBold = "="
    memeCommentArray.push(x);
    newCID++;
    for (var i = 0; i < memeCommentArray.length; i++)
    {
        // Print out each comment with corresponding information. [author, text, etc.]
        z = y.concat("+", borderChar.repeat(memeCommentArray[i].author.length + 2), "+\n| ", memeCommentArray[i].author, " |\n", borderCharBold.repeat(82), 
            "\n", memeCommentArray[i].text, "\n", borderCharBold.repeat(82), "\n\n");
        y = z;
    }
    document.getElementById("display").innerHTML = z;
}
//function renderComments() {
    // TODO - render each Comment in Comment array here
//}