const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const interview = sequelize.define(
    "interview",
    {
        // id
        // userid
        time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        result: {// 面试是否通过
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        remark: {
            type: DataTypes.STRING,
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
)

module.exports = interview;
