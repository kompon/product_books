const { Sequelize, DataTypes } = require('sequelize');
// เชื่อมต่อกับฐานข้อมูล
const sequelize = require('../config/db');

// สร้าง Model สำหรับ Product
const Product = sequelize.define('Product', {
    book_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    book_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'books', // ชื่อ table ในฐานข้อมูล
    timestamps: true, // สร้าง createdAt และ updatedAt
});

module.exports = Product;
