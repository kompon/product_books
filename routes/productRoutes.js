const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bookController = require('../controllers/bookController');
const router = express.Router();

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์ที่อัพโหลด
const upload_path = './public/images';
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

// เส้นทางสำหรับ API หนังสือ
router.post('/books', upload.single('image'), bookController.createBook);
router.get('/books', bookController.getdata);
router.put('/books/:book_id', upload.single('image'), bookController.updateBook);
router.delete('/books/:book_id', bookController.deleteBook);

module.exports = router;
