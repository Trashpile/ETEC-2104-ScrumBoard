"use strict";

$(document).ready( () => {
    let form = $("#searchbydate");
    form.append( $("<label>").text("From ") );
    let fromdateinput = makedatepicker();
    form.append( $("<label>").text(" to ") );
    let Todateinput = makedatepicker();
    form.append( $("<div>").text("Order:") );
    let mostrecentinput = $("<input>");
    mostrecentinput.prop("name","sorttype");
    mostrecentinput.prop("type","radio");
    mostrecentinput.prop("value","1");
    mostrecentinput.prop("checked",true);
    form.append(mostrecentinput);
    form.append( $("<label>").text("Most Recent") );
    let oldestinput = $("<input>");
    oldestinput.prop("name","sorttype");
    oldestinput.prop("type","radio");
    oldestinput.prop("value","0");
    form.append(oldestinput);
    form.append( $("<label>").text("Oldest") );
    let b = $("<button>");
    b.text("Search");
    let div = $("<div>");
    div.append(b);
    form.append(div);
    b.click( () => {
        $.post(
            "/searchbydate",
            {
                fromDate: fromdateinput.val(),
                toDate: Todateinput.val(),
                sortType: $("input[name=sorttype]:checked").val()
            },
            (data,status,xhr) => {
                console.log("The server said:",status,data);
            },
            "text"
        );
    })
});

function makedatepicker(){
    let D = $("<input>");
    $(D).datepicker();
    $(D).change( () => {
        let newdate = $(D).datepicker("getDate");
        console.log("CHANGED",newdate);
    });
    $("#searchbydate").append(D);
    return D;
}