let index = index.html;
let sqlite3 = require("sqlite3").verbose();

function main(){
    
    let conn = new sqlite3.Database("foo.sql");
    
    conn.serialize();

    conn.run( `create table accountinfo(
                username varchar(100),
                password varchar(50))`, 
            [], 
            (e) => { console.log("create error:",e); }
    );

    let username = "MetalGearSolid6";
    let password = "SerpentsWrath";
    conn.run( "insert into accountinfo (username, password) values ($name, $passwd)",
        { $name: username, $passwd: password },
        (e) => { console.log("insert bob error:",e); } 
    );
    
    let username = "CrashBandicoot4";
    let password = "WrathOfTFB";
    conn.run( "insert into accountinfo (username, password) values ($name, $passwd)",
        { $name: username, $passwd: password },
        (e) => { console.log("insert bob error:",e); } 
    );
     
    conn.close();
    
    console.log("Done");
}

function update(username, newpassword){
    username.password = newpassword;
}

main();