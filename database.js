sqlite3 = require("sqlite3").verbose();

let conn = new sqlite3.Database("./priv/memedepository.sql");
let name = "Bob";
let password = "s3cr3t";
function main()
{
    conn.serialize(); //Says everytime you submit something to database, it'll force it to run sequentially.
    //Reduces performance, useful for tests
    //It's better to put future async funcs in a callback function - but for now, this'll work.


    
    //
    try
    {
        //...use conn...
        conn.run( `create table users(
                uid integer primary key ,
                name varchar(32),
                password varchar(32),
                avatar blob)`,
            {}, //Parameters
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        //Gotta make a junction table from memes to tags.
        conn.run( `create table memes(
            mid integer primary key ,
            name varchar(32),
            uid integer foreign key,
            tid integer foreign key
            avatar blob)`,
        {}, //Parameters
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        //Insert enum for tag type.
        conn.run( `create table tags(
            tid integer primary key ,
            name varchar(32),
            )`,
        {}, //Parameters
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        }
    );
        conn.run( "insert into users (name, password) values ($name, $passwd)",
            { $name: name, $passwd: password }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );


    } 
    finally
    {
        conn.close();
    }
}
exports.recreateDatabase = main;