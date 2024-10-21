// server.js หรือ app.js
const express = require('express');
const cors = require('cors'); // เพิ่ม cors
const sequelize = require('./config/db');
const routes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors()); // เพิ่ม middleware CORS
app.use(express.json());
app.use(express.static('public')); // ระบุตำแหน่ง url สำหรับเรียกดูรูปภาพ
app.use('/images', express.static('images')); // ระบุตำแหน่ง url สำหรับเรียกดูรูปภาพ

// API routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await sequelize.sync({ force: false });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // ออกจากโปรแกรมถ้าไม่สามารถเชื่อมต่อฐานข้อมูลได้
    }
};

startServer();

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
