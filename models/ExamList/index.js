const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const list = sequelize.define(
    "exam_list",
    {
        // 考生id
        // 试卷id
        startTime: { // 进入考试的时间
            type: DataTypes.DATE,
            allowNull: true
        },
        endTime: {// 交卷时间
            type: DataTypes.DATE,
            allowNull: true
        },
        isDone: {// 是否已经完成
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: { // 状态
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

module.exports = list;
