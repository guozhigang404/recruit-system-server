const sequelize = require("./../db");
const {DataTypes} = require("sequelize");


const notice = sequelize.define(
    "notice",
    {
        // id
        // userid
        // 内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // 是否已读
        read:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
);

module.exports = notice;
