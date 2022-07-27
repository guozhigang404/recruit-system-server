const sequelize = require("./../db");
const {DataTypes} = require("sequelize");
const md5 = require("md5");
const moment = require("moment");
// id
// userTypeId
// 姓名
const user = sequelize.define(
    "user",
    {
        name:{ // 姓名
            type: DataTypes.STRING,
            allowNull: false
        },
        loginPwd: { // 密码
            type: DataTypes.STRING,
            defaultValue: md5("000000"),　// 默认值
            allowNull: false
        },
        email: { // 邮箱
            type: DataTypes.STRING,
            allowNull: true
        },
        tel: { // 电话
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: { // 性别
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        birth: { // 出生日期
            type: DataTypes.DATE,
            allowNull: true
        },
        age: {// 年龄
            type: DataTypes.VIRTUAL, //　虚拟字段
            get() {
                if (this.birth) {
                    const now = moment.utc();
                    const birth = moment.utc(this.birth);
                    return now.diff(birth, "y")
                }
                return -1;
            }
        },
        address: {　// 地址
            type: DataTypes.STRING,
            allowNull: true
        },
        major: {　// 专业
            type: DataTypes.STRING,
            allowNull: true
        },
        university:{　// 毕业院校
            type: DataTypes.STRING,
            allowNull: true
        },
        qualifications: {　// 学历
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {　// 头像
            type: DataTypes.STRING,
            allowNull: true,
        },
        remark: {　// 备注
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        createdAt: true,
        updatedAt: false,
        paranoid: true, // deleteAt
        freezeTableName: true
    }
);

module.exports = user;
