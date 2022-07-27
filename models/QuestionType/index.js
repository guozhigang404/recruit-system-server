const sequelize = require("./../db");
const {DataTypes} = require("sequelize")
// 题目类型
const questionType = sequelize.define(
    "question_type",
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: false,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
)

module.exports = questionType;
