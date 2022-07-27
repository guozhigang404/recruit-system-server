const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

/*
* 黑名单表
* reason
* userid
* */
const blacklist = sequelize.define(
    "blacklist",
    {
        // id
        // userid

        reason: {// 加入黑名单的原因
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: false,
        paranoid: false, // deleteAt
        freezeTableName: true
    }
);
module.exports = blacklist;
