$(document).ready( () => {

    let form = $("#myform");
    // form.append( $("<div>").text("Name:") );
    // let nameinput = $("<input>");
    // form.append(nameinput);
    let image = $("<img id='actualProfilePic' src = 'profilepic.png'/>");
    form.append(image)
    
    let picinput = $("<input>");
    picinput.prop("type","file");
    form.append(picinput);

    let b = $("<button>");
    form.append(b);
    b.text("Change Profile Picture");

    b.click( () => {
        let R = new FileReader();
        let F = picinput.prop("files")[0];

        R.onload = () => {
            $.post(
                "/uploadpic", 
                {
                    // name: nameinput.val(),
                    pic: R.result
                },
                (data,status,xhr) => {
                    console.log("the server said:", status, data);
                },
                "text"
            );
        };
        R.readAsDataURL(F);

        //refresh webpage
        location.reload()
    });
});