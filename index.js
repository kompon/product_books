const express = require('express');
const sequelize = require('./config/db'); // ปรับเส้นทางให้ตรงกับที่อยู่ของไฟล์ db.js

const app = express();
// ... ตั้งค่าเซิร์ฟเวอร์อื่น ๆ ...

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
