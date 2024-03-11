const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db");

db.serialize(() => { //追記
    db.run("drop table if exists members");
    db.run("create table if not exists members(name,age)"); //追記
    db.run("insert into members(name,age) values(?,?)", "hoge", 33);
    db.run("insert into members(name,age) values(?,?)", "foo", 44);
    db.run("update members set age = ? where name = ?", 55, "foo");
    db.each("select * from members", (err, row) => {
        console.log(`${row.name} ${row.age}`);
    });
    db.all("select * from members", (err, rows) => { //追記
        console.log(JSON.stringify(rows));
    });
    db.get("select count(*) from members", (err, count) => { //追記
        console.log(count["count(*)"]);
    })
});

db.close();

// 解説
// db.serialize
// 非同期処理のコードでは、操作が途中で割り込まれる可能性があります。これを防ぐために利用されます。