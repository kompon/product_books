const { Pool } = require('pg');

// สร้างการเชื่อมต่อกับฐานข้อมูล
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  max: 20, // จำนวน connection สูงสุดใน pool
  idleTimeoutMillis: 30000, // เวลาที่ connection สามารถอยู่ในสถานะ idle
  connectionTimeoutMillis: 2000, // เวลารอการเชื่อมต่อ
});

// ตรวจสอบการเชื่อมต่อ
pool.connect((err) => {
    if (err) {
        console.error("Connection to PostgreSQL failed:", err);
    } else {
        console.log("Connected to PostgreSQL successfully!");
    }
});

module.exports = pool;
