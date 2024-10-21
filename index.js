const express = require('express');
const sequelize = require('./config/db'); // ปรับเส้นทางให้ตรงกับที่อยู่ของไฟล์ db.js
const productRoutes = require('./routes/productRoutes'); // นำเข้าเส้นทางสำหรับสินค้า

const app = express();

// ใช้ middleware เพื่อ parse JSON request body
app.use(express.json());

// ใช้ routing สำหรับ API
app.use('/api', productRoutes); // กำหนด routing ให้สามารถเข้าถึง API ผ่าน /api

// ตั้งค่าเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message || err);
  });
