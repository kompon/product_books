const { Sequelize } = require('sequelize');
require('dotenv').config(); // โหลดตัวแปรจาก .env

// สร้างการเชื่อมต่อกับฐานข้อมูล
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // ปรับเป็น true ถ้าคุณต้องการตรวจสอบใบรับรอง SSL
    },
  },
});

// ตรวจสอบการเชื่อมต่อ
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message || err);
    // เพิ่มข้อมูลเพิ่มเติมเกี่ยวกับข้อผิดพลาด
  });

module.exports = sequelize; // ส่งออก sequelize สำหรับใช้งานในไฟล์อื่น
