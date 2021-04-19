$(document).ready( () => {

    var doesntExist = true;

    

    let form = $("#myform");
    form.append( $("<div>").text("A Meme:") );
    // let nameinput = $("<input>");
    // form.append(nameinput);
    let image = $("<img id='meme' src = 'profilepic.png'/>");
    form.append(image)
    
    // let picinput = $("<input>");
    // picinput.prop("type","file");
    // form.append(picinput);

    let b = $("<button>");
    form.append(b);
    b.text("Share Meme");

    b.click( () => {

        if(doesntExist)
        {
            doesntExist = false;



            let URL = window.location.href;
            
            let input = $(`<input type='text' value=${URL} id='input'>`)
            form.append(input);

            let b2 = $("<button onclick='copyFunction()'>Copy</button>")
            form.append(b2);
        }
        
    });
});