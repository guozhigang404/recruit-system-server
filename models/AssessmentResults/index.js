const sequelize = require("./../db");
const {DataTypes} = require("sequelize");

const assessmentResult = sequelize.define(
    "assessment_result",
    {
        // id
        // 考生id
        // 试卷id
        examsId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        answer:{// 考生提交的答案
            type: DataTypes.TEXT,
            allowNull: false
        },
        objective: {// 客观题成绩
            type: DataTypes.DOUBLE(7, 2),
            allowNull: true
        },
        subjective: {// 主观题成绩
            type: DataTypes.DOUBLE(7, 2),
            allowNull: true
        },
        total: {//总成绩
            type: DataTypes.DOUBLE(7, 2),
            allowNull: true
        },
        isPass: { //考核是否通过
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: -1
        },
        remark: {
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

module.exports = assessmentResult;
