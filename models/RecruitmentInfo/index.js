const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

module.exports = sequelize.define(
    "recruitment_info",
    {
        content: { // 职位名称
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {// 职位详情
            type: DataTypes.TEXT,
            allowNull: false
        },
        count: { // 招聘数量
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        },
        wages: { // 预计薪资
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
)
