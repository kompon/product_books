const Book = require('../models/book');

// ฟังก์ชันสำหรับเพิ่มข้อมูลหนังสือใหม่
exports.createBook = async (req, res) => {
    try {
        const { book_name, price } = req.body;
        const image_url = req.file ? req.file.filename : null;
        const book = await Book.create({ book_name, image_url, price });
        res.status(201).json({ message: 'เพิ่มหนังสือใหม่สำเร็จ', book });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ', error: error.message });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลหนังสือทั้งหมด
exports.getdata = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ฟังก์ชันสำหรับแก้ไขข้อมูลหนังสือตาม ID
exports.updateBook = async (req, res) => {
    try {
        const { book_name, price } = req.body;
        const image_url = req.file ? req.file.filename : null;
        const book = await Book.findByPk(req.params.book_id);
        if (!book) {
            return res.status(404).json({ error: 'ไม่พบหนังสือ' });
        }
        await book.update({ book_name, image_url, price });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ฟังก์ชันสำหรับลบข้อมูลหนังสือตาม ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.book_id);
        if (!book) {
            return res.status(404).json({ error: 'ไม่พบหนังสือ' });
        }
        await book.destroy();
        res.json({ message: 'ลบหนังสือสำเร็จ' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
