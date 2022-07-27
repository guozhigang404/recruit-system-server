const {User, UserType} = require("./../../models");
const {Op} = require("sequelize")
const md5 = require("md5")
const {ErrorHandle} = require("./../../utils")
const Resume = require("./../Resume")
const blackServe = require("./../Blacklist")

/**
 * 根据id获取用户
 * @param id 用户id
 * @returns {Promise<*|null>}
 */
async function getUserById(id) {
    const data = await User.findByPk(id, {
        attributes: ["id", "name", "email", "tel",
            "sex", "birth", "address", "major",
            "university", "qualifications", "photo", "remark",
            "age", "userTypeId"
        ],
        include: [UserType]
    });

    return data ? data.toJSON() : null;
}

/**
 * 分页获取用户
 * @param page 页码，默认 1
 * @param limit 每页数据量， 默认10
 * @param sex 性别，1——男， 0——女， -1——不按照性别筛选
 * @param key 关键字，按照name, email, tel, address, major, university, qualifications
 * @param userId
 * @returns {Promise<{total: Number, data: any}>}
 */
async function getUserByPage(page = 1, limit = 10, sex = -1, key = "", userId = null) {
    let where = {};
    if (sex === 1 || sex === 0) {
        where.sex = !!sex;
    }
    if (key !== "") {
        where[Op.or] = [
            {
                name: {[Op.like]: `%${key}%`}
            },
            {
                email: {[Op.like]: `%${key}%`}
            },
            {
                tel: {[Op.like]: `%${key}%`}
            },
            {
                address: {[Op.like]: `%${key}%`}
            },
            {
                major: {[Op.like]: `%${key}%`}
            },
            {
                university: {[Op.like]: `%${key}%`}
            },
            {
                qualifications: {[Op.like]: `%${key}%`}
            }
        ]
    }
    if(userId) {
        where[Op.not] = [
            {
                id: [userId]
            }
        ]
    }

    const result = await User.findAndCountAll({
        where,
        include: [UserType],
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ["createdAt", "DESC"]
        ],
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 根据手机号获取用户
 * @param num 手机号
 * @returns {Promise<null|*>}
 */
async function  getUserByTel(num) {
    const result = await User.findOne({
        where: {
            tel: num,
        }
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 根据邮箱获取用户
 * @param email
 * @returns {Promise<null|*>}
 */
async function getUserByEmail(email) {
    const result = await User.findOne({
        where: {
            email
        }
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 根据id删除用户，（软删除）
 * @param id 用户id
 * @returns {Promise<number>}
 */
async function deleteUserById(id) {
    return await User.destroy({
        where: {
            id
        }
    });
}

/**
 * 添加用户
 * @param data 用户信息
 * @returns {Promise<void>}
 */
async function addUser(data) {
    const userByTel = await getUserByTel(data.tel);
    const userByEmail = await getUserByEmail(data.email);
    if (userByEmail) {
        throw ErrorHandle.createErrorIns(
            ErrorHandle.errorNames.existsError,
            `邮箱 ${data.email} 已经被注册`
        );
    }
    if (userByTel) {
        throw ErrorHandle.createErrorIns(
            ErrorHandle.errorNames.existsError,
            `手机号 ${data.tel} 已经被注册`
        )
    }
    data.loginPwd = md5(data.loginPwd);
    const ins = await User.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

async function register(data) {
    const userByTel = await getUserByTel(data.tel);
    if (userByTel) {
        throw ErrorHandle.createErrorIns(
            ErrorHandle.errorNames.existsError,
            `手机号 ${data.tel} 已经被注册`
        )
    }
    data.loginPwd = md5(data.loginPwd);
    const ins = await User.create(data);
    if (ins) {
        await Resume.addResume({
            userId: ins.id
        })
        return ins.toJSON();
    }
    return null;
}

/**
 * 更新用户信息
 * @param id
 * @param data
 * @returns {Promise<void>}
 */
async function updateUser(id, data) {
    if (data.loginPwd) {
        data.loginPwd = md5(data.loginPwd);
    }
    const result = await User.update(data, {
        where: {
            id
        }
    });
    return result[0]
}

/**
 * 登录
 * @param username 手机号或者邮箱
 * @param password 密码
 * @returns {Promise<null|*>}
 */
async function login(username, password) {
    if (!(username && password)) {
        return null;
    }
    const result = await User.findOne({
        where: {
            [Op.or]: [
                {
                    tel: username
                },
                {
                    email: username
                }
            ],
            loginPwd: md5(password)
        },
        include: [UserType],
    });
    if (result) {
        const black = await blackServe.getBlackUserByUserId(result.id);
        if (black) {
            return {
                isBlack: true,
                msg: "已被加入黑名单"
            }
        }
        const userData = result.toJSON();
        if (
            userData.tel === username || userData.email === username
        ) {
            delete userData.loginPwd;
            return userData
        }
        return null;
    }
    return null;
}

async function isLogin(userId) {

}

module.exports = {
    getUserByPage,
    getUserById,
    getUserByTel,
    getUserByEmail,
    deleteUserById,
    updateUser,
    addUser,
    login,
    register,
    isLogin
}
