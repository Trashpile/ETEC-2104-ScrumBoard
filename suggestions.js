//let index = index.html;
let sqlite3 = require("sqlite3").verbose();

function main(){
    
    let conn = new sqlite3.Database("foo.sql");
    
    conn.serialize();

    conn.run( `create table suggestions(
                username varchar(100),
                rank varchar(25),
                daysloggedin integer,
                suggestiontype varchar(100),
                suggestion varchar(1000))`, 
            [], 
            (e) => { console.log("create error:",e); }
    );

    let username = "R0b3rtC0p";
    let rank = "Mod";
    let daysloggedin = 76;
    let suggestiontype = "Other";
    let suggestion = "None";
    conn.run( "insert into suggestions (username, rank, daysloggedin, suggestiontype, suggestion) values ($name, $rank, $loggedin, $type, $suggest)",
        { $name: username, $rank: rank, $loggedin: daysloggedin, $type: suggestiontype, $suggest: suggestion },
        (e) => { console.log("insert bob error:",e); } 
    );
    
    username = "Jumanji";
    rank = "General";
    daysloggedin = 23;
    suggestiontype = "Other";
    suggestion = "None";
    conn.run( "insert into suggestions (username, rank, daysloggedin, suggestiontype, suggestion) values ($name, $rank, $loggedin, $type, $suggest)",
        { $name: username, $rank: rank, $loggedin: daysloggedin, $type: suggestiontype, $suggest: suggestion },
        (e) => { console.log("insert bob error:",e); } 
    );
     
    conn.close();
    
    console.log("Done");
}

function update(username, daysloggedin, suggestiontype, suggestions){
    if(daysloggedin >= 7){
        username.suggestiontype = suggestiontype;
        username.suggestions = suggestions;
    }
}

main();