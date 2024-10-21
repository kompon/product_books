const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// สร้าง Model สำหรับ User
const User = sequelize.define('User', {
    user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
