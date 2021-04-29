sqlite3 = require("sqlite3").verbose();

let conn = new sqlite3.Database("./priv/memedepository.sql");
let alt = new sqlite3.Database("./priv/tagWriteTest.sql")
let name = "Bob";
let password = "s3cr3t";

class Database{
    static instance = null;

    constructor(){
        this.conn = new sqlite3.Database("./priv/memedepository.sql");
        this.alt = new sqlite3.Database("./priv/tagWriteTest.sql");
        conn.serialize();
    }
    static getInstance(){
        if(Database.instance == null)
            Database.instance = new Database();
        return Database.instance;
    }
      //...other methods here if desired...
      ///sqlQuery is the string we send into the database in sql formatting  
      ///sqlParams is the {}, the list of paramaters inside the query string.  
      ///EX  {$tagContent: "Meme", $tagType: tagType.Official} replaces the $tagContent and $tagType inside the string with "Meme" and tagType.Official
      ///callback ensures it completes in an asynchronous fashion, useful for error checking.
    run( sqlQuery, sqlParams, callback ){
        this.conn.run( sqlQuery, sqlParams, () => { callback(); } );
    }
    all(sqlQuery, sqlParams, callback)
    {
        this.conn.all(sqlQuery, sqlParams, (e, rows) => {callback(e,rows); } );
    }
    runALT( sqlQuery, sqlParams, callback ){
        this.alt.run( sqlQuery, sqlParams, () => { callback(); } );
    }
    allALT(sqlQuery, sqlParams, callback)
    {
        this.alt.all(sqlQuery, sqlParams, (e, rows) => {callback(e,rows); } );
    }
    //This is for user freindliness.  It's meant to abstract code so the user doesn't have to write SQL strings.
    //This function makes an SQL query to add something into the memes table, for example.
    addMeme(name, likes=0){
        this.conn.run( "insert into memes (name, likes) values ($name, $likes)",
            { $name: name, $likes: likes }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
    }

    addFavorite(userID, memeID){
        this.conn.run( "insert into favorites (userID, memeID) values ($userID, $memeID)", 
        { $userID : userID, $memeID : memeID },
        (e) => {
            console.log("error is:", e);
        });
    }
}


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
    conn = new sqlite3.Database("./priv/memedepository.sql");
    alt = new sqlite3.Database("./priv/tagWriteTest.sql");
    conn.serialize(); //Says everytime you submit something to database, it'll force it to run sequentially.
    //Reduces performance, useful for tests
    //It's better to put future async funcs in a callback function - but for now, this'll work.

    try
    {
        if (reset)
        {
            conn.run( `drop table users`,
            {}, //Initial parameters. Empty for now.
            (e) => {
                console.log("error is:",e) //Runs if err, null if not
            }
            //We could replace this conn.run() with Database.Database.getinstance().run('drop table users', {}, (e)=> {console.log("error is:",e);})
            //It would essentially be the same, but -
            //The difference being, we can use this in many different parts of code without repeating making a new database.
            //We can refactor this further for ease of use, though . . . such as making a drop() function that already knows to drop a table, give no params,
            //And then give a callback error function . . . Simplifying the call to Database.getinstance().drop("users");
            //This makes debugging all these tables simultaneously, as well as integrating it into merged code, much easier.
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
            likes integer,
            avatar blob)`,
        {}, //Initial parameters. Empty for now.
        (e) => {
            console.log("error is:",e) //Runs if err, null if not
        });

        //junction table from users to memes for favorites
        conn.run( `create table favorites(
            mid integer foreign key,
            uid integer foreign key)`,
        {}, 
        (e) => {
            console.log("error is:",e) 
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
        //This should ALSO probably be later removed; Database manipulation should happen elsewhere.
        conn.run( "insert into memes (name, likes) values ($name, $likes)",
            { $name: "SadCat", $likes: 5 }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
         conn.run( "insert into memes (name, likes) values ($name, $likes)",
            { $name: "SadderCat", $likes: 50 }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
         conn.run( "insert into memes (name, likes) values ($name, $likes)",
            { $name: "SaddestCat", $likes: -5 }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );

        conn.run( "insert into favorites (userID, memeID) values ($userID, $memeID)",
            { $userID: 1, $memeID: 1 }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );

        conn.run( "insert into favorites (userID, memeID) values ($userID, $memeID)",
            { $userID: 1, $memeID: 2 }, //Parameters - use the $ sign in .run()
            (e) => {  
                console.log("error is:",e) 
            }
        );
        //Example of refactored meme call!
        //Should add a meme with 0 likes called Boring cat, at mid 4.
        Database.getInstance().addMeme("Boring cat"); //It would be Database.Database.getInstance() outside this file!
        Database.getInstance().addMeme("Rad cat", 40);
        Database.getInstance().addMeme("Mad cat");
        Database.getInstance().addFavorite(1,1);
        Database.getInstance().addFavorite(1,2);
        Database.getInstance().addFavorite(1,3);

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
exports.Database = Database;