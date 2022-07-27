// * 客观题
const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const question = sequelize.define(
    "objective_question",
    {
        label: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        a: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        b: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        c: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        d: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
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
