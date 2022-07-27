// * 主观题
const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const question = sequelize.define(
    "subjective_question",
    {
        label: { // 标签
            type: DataTypes.STRING,
            allowNull: true
        },
        content: { // 内容
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: { // 答案
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
);

module.exports = question;
