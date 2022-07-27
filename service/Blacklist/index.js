const {Blacklist, User} = require("./../../models");
const {Op} = require("sequelize")

/**
 * 分页获取黑名单
 * @param page 页码
 * @param limit 页容量
 * @param query 关键词
 * @returns {Promise<{total: Number, data: Array}>}
 */
async function getAllBlackList(page = 1, limit = 10, query) {
    let where = {};
    if (query) {
        where.reason = {
            [Op.like]: `%${query}%`
        }
    }
    const result = await Blacklist.findAndCountAll({
        where,
        include: [User],
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ["createdAt", "DESC"]
        ]
    });
    return {
        total: result.count,
        data: JSON.parse((JSON.stringify(result.rows)))
    }
}

/**
 * 根据id获取黑名单
 * @param id
 * @returns {Promise<null|any>}
 */
async function getBlackUserById(id) {
    const result = await Blacklist.findByPk(id);
    if(result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 根据用户id获取黑名的信息
 * @param userId 用户id
 * @returns {Promise<null|*>}
 */
async function getBlackUserByUserId(userId) {
    const result = await Blacklist.findOne({
        where:{
            userId
        }
    });
    if(result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 添加黑名单
 * @param data 数据
 * @returns {Promise<null|any>}
 */
async function addBlacklist(data) {
    const result = await Blacklist.create(data);
    if(result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 更新黑名单的数据
 * @param id 编号
 * @param data 新的数据
 * @returns {Promise<*>}
 */
async function updateBlacklist(id, data) {
    const result = await Blacklist.update(data, {
        where: {
            id
        }
    });
    return result[0];
}

/**
 * 通过id,将用户从黑名单中移除
 * @param id
 * @returns {Promise<number>}
 */
async function deleteBlacklistById(id) {
    return await Blacklist.destroy({
        where: {
            id
        }
    });
}

/**
 * 将指定的用户从黑名中删除
 * @param userId 用户id
 * @returns {Promise<number>}
 */
async function deleteBlacklistByUserId(userId) {
    return await Blacklist.destroy({
        where: {
            userId
        }
    })
}

module.exports = {
    getAllBlackList,
    getBlackUserById,
    getBlackUserByUserId,
    addBlacklist,
    updateBlacklist,
    deleteBlacklistById,
    deleteBlacklistByUserId
}
