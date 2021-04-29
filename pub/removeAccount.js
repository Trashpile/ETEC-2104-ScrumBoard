"use strict";

$(document).ready( () => {
    let form = $("#removeCheck");
    let b = $("<button>");
    b.text("Confirm");
    form.append(b);
    b.click( () => {
        $.get(
            "/removeAccount",
            {},
            (data,status,xhr) => {
                console.log("The server said:",status,data);
                $(location).attr('href', '/home')
            },
            "text"
        );
    })
});