const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const user_type = sequelize.define(
    "user_type",
    {
        // id

        name: { // 名称
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
);
module.exports = user_type;
