const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const bookController = require('../controllers/bookController');
const router = express.Router();

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัปโหลด
const upload_path = './public/images';

// ตรวจสอบว่ามีโฟลเดอร์ images หรือไม่
if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path, { recursive: true });
}

// ตั้งค่า multer สำหรับจัดการไฟล์อัปโหลด
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_path);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// กำหนดเส้นทางหรือ URL สำหรับเรียกใช้งานแต่ละ API
router.post('/Books', upload.single('image'), bookController.createBook);
router.get('/Books', bookController.getdata);
router.put('/Books/:book_id', upload.single('image'), bookController.updateBook);
router.delete('/Books/:book_id', bookController.deleteBook);

module.exports = router;
