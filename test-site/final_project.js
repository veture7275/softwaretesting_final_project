var mysql = require('mysql2');
var db_option = {
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'softwaretesting',
    port: 3306
};
console.log(db_option);

var db = mysql.createConnection(db_option);
db.connect();
var query = "select * from `product`;";
//db.execute(query);

db.query(query, function (err, rows, fiels) {
    if (err) {
        console.log(err);
        return;
    }
    //rows是資料庫query出來的所有資料(JSON)
    console.log(rows);
    //fiels是欄位的資訊
    console.log(fiels);
});


console.log("testing end");
db.end();