const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());  

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'benson2003611',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('資料庫連接錯誤:', err);
    return;
  }
  console.log('已成功連接至資料庫！');
});

// 註冊處理路由
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;  // 獲取前端傳來的資料

  console.log('收到的註冊資料:', email, password);  // 打印收到的資料

  // 檢查資料庫中是否已經存在相同的 email
  const checkQuery = 'SELECT * FROM user_school WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('資料庫查詢錯誤:', err);
      return res.status(500).json({ message: '內部伺服器錯誤', error: err });
    }

    if (results.length > 0) {
      // 如果 email 已經存在
      console.log('該電子郵件已經註冊:', email);  // 打印該 email 已經註冊
      return res.status(400).json({ message: '該電子郵件已經註冊' });
    }

    // 插入新用戶資料
    const insertQuery = 'INSERT INTO user_school (email, password) VALUES (?, ?)';
    db.query(insertQuery, [email, password], (err, results) => {
      if (err) {
        console.error('資料庫插入錯誤:', err);  // 打印錯誤訊息
        return res.status(500).json({ message: '註冊錯誤', error: err });
      }

      console.log('註冊成功，插入ID:', results.insertId);  // 打印成功的插入 ID
      res.status(201).json({
        message: '註冊成功',
        userId: results.insertId,
        email: email
      });
    });
  });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;  // 獲取前端傳來的資料
  
    console.log('收到的登入資料:', email, password);  // 打印收到的帳號和密碼
  
    // 查詢資料庫中是否存在該用戶
    const query = 'SELECT * FROM user_school WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('資料庫查詢錯誤:', err);
        return res.status(500).json({ message: '內部伺服器錯誤' });
      }
  
      console.log('查詢到的結果:', results);  // 打印查詢結果
  
      if (results.length === 0) {
        return res.status(400).json({ message: '用戶不存在' });
      }
  
      const user = results[0];
  
      console.log('查詢到的用戶資料:', user);  // 打印查詢到的用戶資料
  
      // 驗證密碼
      if (user.password !== password) {
        return res.status(400).json({ message: '密碼錯誤' });
      }
  
      res.status(200).json({
        message: '登入成功',
        userId: user.id,
        email: user.email
      });
    });
  });
  

// 啟動伺服器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`伺服器正在 http://localhost:${PORT} 上運行...`);
});
