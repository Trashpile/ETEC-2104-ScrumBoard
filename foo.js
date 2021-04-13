let sqlite3 = require("sqlite3").verbose();
let conn = new sqlite3.Database("foo.sql");
conn.serialize()

try{
    conn.run( `create table users(
        uid integer primary key,
        name varchar(32),
        password varchar(32),
        avatar blob)`,
        [], (e) => {
            console.log("e is:",e)

            let name = "Bob";
            let password = "s3cr3t";
            conn.run( "insert into users (name, password) values ($name, $passwd)",
                { $name: name, $passwd: password },
                (e) => {
                    console.log("e is:",e)
                }
            );
        }
    );
 
} finally{
    conn.close();
}

/*
select uid from accts where name=‘bob’ and passwd=’fifi’;
^if returns nothing, user does not exist
*/