const Product = require('../models/Product'); // นำเข้าโมเดล Product

// สร้างหนังสือใหม่
exports.createBook = async (req, res) => {
    try {
        const { book_name, price } = req.body; // ดึงข้อมูลจาก request body
        const image_url = req.file ? req.file.path : null; // ดึง path ของไฟล์ที่อัปโหลด
        
        const newBook = await Product.create({ book_name, price, image_url });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error: error.message });
    }
};

// ดึงข้อมูลหนังสือทั้งหมด
exports.getdata = async (req, res) => {
    try {
        const books = await Product.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

// อัปเดตข้อมูลหนังสือตาม ID
exports.updateBook = async (req, res) => {
    const { book_id } = req.params;
    try {
        const book = await Product.findByPk(book_id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const { book_name, price } = req.body;
        const image_url = req.file ? req.file.path : book.image_url; // ใช้ path เดิมถ้าไม่มีไฟล์ใหม่

        await book.update({ book_name, price, image_url });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

// ลบข้อมูลหนังสือตาม ID
exports.deleteBook = async (req, res) => {
    const { book_id } = req.params;
    try {
        const book = await Product.findByPk(book_id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.destroy();
        res.status(204).send(); // ส่งสถานะ 204 No Content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};
