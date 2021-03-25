$(document).ready( () => {
    let form = $("#loginpage");

    form.append( $("<div>").text("Username:") );
    let userinput = $("<input>");
    userinput.prop("type", "string");
    form.append(userinput);

    form.append( $("<div>").text("Password:") );
    let passinput = $("<input>");
    passinput.prop("type", "password");
    form.append(passinput);

    let b = $("<button>")
    b.text("Login");
    let div = $("<div>");
    div.append(b);
    form.append(div);
    b.click( () => {
        $.post(
            "/login",
            {
                username: userinput.val(),
                password: passinput.val()
            },
            (data,status,xhr) => {
                console.log("The server said: ",status,data);
            },
            "text"          

        )
    })

});