const Product = require('../models/product');

// สร้างหนังสือใหม่
exports.createBook = async (req, res) => {
    try {
        const { book_name, price } = req.body;
        const image_url = req.file ? req.file.filename : null;

        const product = await Product.create({
            book_name,
            image_url,
            price
        });

        res.status(201).json({ message: 'เพิ่มหนังสือใหม่สำเร็จ', product });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเพิ่มหนังสือ', error: error.message });
    }
};

// ดึงข้อมูลหนังสือทั้งหมด
exports.getdata = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// แก้ไขข้อมูลหนังสือตาม ID
exports.updateBook = async (req, res) => {
    try {
        const { book_name, price } = req.body;
        const image_url = req.file ? req.file.filename : null;

        const product = await Product.findByPk(req.params.book_id);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบหนังสือ' });
        }

        await product.update({
            book_name,
            image_url,
            price
        });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ลบข้อมูลหนังสือตาม ID
exports.deleteBook = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.book_id);
        if (!product) {
            return res.status(404).json({ error: 'ไม่พบหนังสือ' });
        }

        await product.destroy();
        res.json({ message: 'ลบหนังสสำเร็จ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
