sqlite3 = require("sqlite3").verbose();

let conn = new sqlite3.Database("./priv/memedepository.sql");
let name = "Bob";
let password = "s3cr3t";

const tagType = {
    Official: 1,
    Unofficial: 2,
    Internal: 3,
}

const language = {
    English: 1,
    Spanish: 2,
    French: 3,
    German: 4,
    Japanese: 5,
    Chinese: 6, 
}

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
            {}, //Initial parameters. Empty for now.
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
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        //In the js, the tagType will be an enum. In the database, it will be an integer.
        conn.run( `create table tags(
            tID integer primary key ,
            tagContent varchar(32),
            tagType integer
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        }
        );
        conn.run( `create table tagAlias(
            t1ID integer foreign key,
            t2ID integer foreign key,
            t1Lang integer,
            t2Lang integer,
            primeAlias integer foreign key
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        }
        );
        //This should probably be later removed; Database manipulation should happen elsewhere. This file just creates it.
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