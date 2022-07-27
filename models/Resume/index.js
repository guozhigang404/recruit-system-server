const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const resume = sequelize.define(
    "resume",
    {
        /*post: {
            type: DataTypes.STRING,
            allowNull: false
        },*/
        path: {
            type: DataTypes.STRING,
            allowNull: true
        },
        salary: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        isPass: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
);

module.exports = resume;
