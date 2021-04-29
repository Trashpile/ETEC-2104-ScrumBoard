$(document).ready( () => {
    let form = $("#myform");
    let meme = $("<img id='meme1' src='meme1.png'/>");

    form.append(meme);
    
    let b = $("<button>");
    form.append(b);
    b.text("Change Profile Picture");
})