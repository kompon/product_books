const User = require('../models/user');

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้
exports.registerUser = async (req, res) => {
    try {
        const { username, password, image_url } = req.body;
        const user = await User.create({ username, password, image_url });
        res.status(201).json({ message: 'ลงทะเบียนสำเร็จ', user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลงทะเบียน', error: error.message });
    }
};

// ฟังก์ชันสำหรับล็อกอิน
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username, password } });
        if (!user) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
        res.status(200).json({ message: 'ล็อกอินสำเร็จ', user });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน', error: error.message });
    }
};
