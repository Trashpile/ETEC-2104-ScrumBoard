"use strict";

let sqlite3 = require("sqlite3").verbose();

const sortType = {
    ASCENDING: 0,   //oldest
    DESCENDING: 1,   //newest
};

function checkDate(date){
    if(typeof date !== "string"){
        return -1;
    }
    if(date.length !== 10){
        return -1;
    }
    if(date[4] !== "/" || date[7] !== "/"){
        return -1;
    }
    return 1;
}

class MemeManager {
    static instance = null;

    constructor(filename){
        this.fname = filename;
    }

    static getInstance(filename){
        let conn = new sqlite3.Database(filename);
        if( MemeManager.instance == null )
        {
            MemeManager.instance = new MemeManager(filename);
        }
        return MemeManager.instance;
    }

    initializeTable(){
        let conn = new sqlite3.Database(this.fname);
        conn.serialize( () => {
            conn.run( `create table memes( 
                mID integer primary key, 
                uID integer,
                date char(10))`, 
            [], 
            (e) => { console.log("create error:",e); }
            );
            conn.close();
        });
    }

    truncateTable(callback){
        let conn = new sqlite3.Database(this.fname);
        conn.run( `delete from memes`, 
            [], 
            (err) => {
            if(err)
                console.log("truncate error:",err);
            conn.close()
            if (typeof callback == "function")
                callback();
            return;
        });
    }

    addMeme(uid,date, callback){
        if(checkDate(date) === -1){
            callback(-1);
            return;
        }
        let year = date.slice(0,4);
        let month = date.slice(5,7);
        let day = date.slice(8,10);
        if(year >= 2000 && month > 0 && month <= 12 && day > 0 && day <= 31){
            let conn = new sqlite3.Database(this.fname);
            conn.run("insert into memes (uID,date) values ($uid,$date)",
                { $uid: uid, $date: date },
                (err) => { 
                if(err){
                    console.log("insert error:",err);
                    callback(-1);
                    return;
                }
                conn.close();
                if (typeof callback == "function"){
                    callback(1);
                    return;
                }
            });
        }
        else{
            callback(-1);
            return;
        }
    }

    deleteMemesByUserID(uid, callback){
        if(uid < 0){
            callback(-1);
            return;
        }
        let conn = new sqlite3.Database(this.fname);
        conn.all("select mID from memes where uID==$uid",
            { $uid: uid },
            (err, rows) => {
                if(err){
                    console.log("select error:",err);
                    conn.close();
                    callback(-1);
                    return;
                }
                if (rows.length == 0){
                    conn.close();
                    callback(-1);
                    return;
                }
                conn.run("delete from memes where uID==$uid",
                    { $uid: uid },
                    (err) => {
                        conn.close();
                        if(err){
                            console.log("delete error:",err);
                            callback(-1);
                            return;
                        }
                        if (typeof callback == "function"){
                            callback(1);
                            return;
                        }
                    }
                )
            }
        )
    }

    searchMemesByDate(start_date, end_date, sort_type, callback){
        if(start_date === null || start_date === undefined){
            callback(-1);
            return;
        }
        else if(checkDate(start_date) === -1){
            callback(-1);
            return;
        }
        if(end_date === null || end_date === undefined){
            callback(-1);
            return;
        }
        else if(checkDate(end_date) === -1){
            callback(-1);
            return;
        }
        if(sort_type != sortType.ASCENDING && sort_type != sortType.DESCENDING){
            callback(-1);
            return;
        }
        let orderBy;
        if(sort_type == sortType.ASCENDING)
            orderBy = "asc";
        else if(sort_type == sortType.DESCENDING)
            orderBy = "desc";
        let conn = new sqlite3.Database(this.fname);
        conn.all("select date from memes where date>=$start and date<=$end order by date "+orderBy,
            { $start: start_date, $end: end_date },
            (err,rows) => {
            if(err){
                console.log("select error:",err);
                callback(-1);
                return;
            }
            /*console.log("Num rows:",rows.length);
            for(let i=0;i<rows.length;++i){
                if(rows[i])
                    console.log("row",i,":",rows[i]);
            }*/
            conn.close();
            if(typeof callback == "function")
                callback(rows);
            return;
        });
    }
}

exports.MemeManager = MemeManager;