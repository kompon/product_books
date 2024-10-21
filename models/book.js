const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// สร้าง Model สำหรับ Book
const Book = sequelize.define('Book', {
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
    tableName: 'books',
    timestamps: true,
});

module.exports = Book;
