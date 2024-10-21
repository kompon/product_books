const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// ลงทะเบียนผู้ใช้
router.post('/register', userController.registerUser);

// ล็อกอินผู้ใช้
router.post('/login', userController.loginUser);

module.exports = router;
