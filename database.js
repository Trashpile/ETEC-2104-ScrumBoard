sqlite3 = require("sqlite3").verbose();

let conn = new sqlite3.Database("./priv/memedepository.sql");
let alt = new sqlite3.Database("./priv/tagWriteTest.sql")
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

function main(reset)
{
    conn.serialize(); //Says everytime you submit something to database, it'll force it to run sequentially.
    //Reduces performance, useful for tests
    //It's better to put future async funcs in a callback function - but for now, this'll work.


    
    //
    try
    {
        if (reset)
        {
            conn.run( `drop table users`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        conn.run( `drop table tags`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        conn.run( `drop table memes`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        conn.run( `drop table memesTagJunction`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        conn.run( `drop table tagAlias`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        alt.run( `drop table tags`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        }
        //...use conn...
        //Note: foreign keys cannot be tagged as such, but primary keys can.
        conn.run( `create table users(
                uid integer primary key,
                name varchar(32),
                password varchar(32),
                avatar blob)`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
        );
        conn.run( `create table memes(
            mid integer primary key,
            name varchar(32),
            uid integer,
            tid integer,
            avatar blob)`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        //In the js, the tagType will be an enum. In the database, it will be an integer.
        conn.run( `create table tags(
            tID integer primary key,
            tagContent varchar(32),
            tagType integer
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        conn.run( `create table memesTagJunction(
            mID integer,
            tID integer
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        conn.run( `create table tagAlias(
            t1ID integer,
            t2ID integer,
            t1Lang integer,
            t2Lang integer,
            primeAlias integer
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        //In the js, the tagType will be an enum. In the database, it will be an integer.
        alt.run( `create table tags(
            tID integer primary key,
            tagContent varchar(32),
            tagType integer
            )`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });
        //This should probably be later removed; Database manipulation should happen elsewhere. This file just creates it.
        conn.run( "insert into users (name, password) values ($name, $passwd)",
            { $name: name, $passwd: password }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        //This is mostly just to create the initial file that I had.
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Meme", $tagType: tagType.Official }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Frozen", $tagType: tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Risque", $tagType: tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Quarantined", $tagType: tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Contentious", $tagType: tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "No Download", $tagType: tagType.Internal }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "tagme", $tagType: tagType.Official }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        conn.run( "insert into tags (tagContent, tagType) values ($tagContent, $tagType)",
            { $tagContent: "Crud", $tagType: tagType.Unofficial }, //Parameters - use the $ sign in .run()
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

if( module  === require.main)
    main(true);

exports.recreateDatabase = main;
exports.tagType = tagType;
exports.language = language;