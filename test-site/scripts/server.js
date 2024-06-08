import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'softwaretesting',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('连接数据库时出错:', err);
        return;
    }
    console.log('已连接到 MySQL 数据库。');
});

app.get('/products', (req, res) => {
    const query = 'SELECT * FROM product';
    db.query(query, (err, results) => {
        if (err) {
            console.error('执行查询时出错:', err);
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`服务器正在运行在端口 ${port}`);
});