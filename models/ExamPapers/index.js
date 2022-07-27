const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const exam = sequelize.define(
    "exam_papers",
    {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        strict: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
);

module.exports = exam;
