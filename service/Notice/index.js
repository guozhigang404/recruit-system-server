const {Notice} = require("./../../models");
const {Op} = require("sequelize")


/**
 * 根据id获取通知
 * @param id
 * @returns {Promise<null|any>}
 */
async function getNoticeById(id) {
    const result = await Notice.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 获取通知
 * @param userId 用户id
 * @param page 页码
 * @param limit 页容量
 * @param query 关键词
 * @param orderRule 据 createdAt排序 DESC——降序 | ACS——升序
 * @returns {Promise<{total: Number, data: Array}>}
 */
async function getNoticeByUserId(userId, page = 1, limit = 10, query = "", orderRule = "DESC") {
    let where = {userId}
    if (query) {
        where.content = {
            [Op.like]: `%${query}%`
        }
    }
    const result = await Notice.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ["createdAt", orderRule],
            ["read", orderRule]
        ]
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 添加一个通知
 * @param data 数据
 * @returns {Promise<null|any>}
 */
async function addNotice(data) {
    const result = await Notice.create(data);
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 删除通知
 * @param id 编号
 * @returns {Promise<number>}
 */
async function deleteNotice(id) {
    return await Notice.destroy({
        where: {
            id
        }
    });
}

async function updateNotice(id, data) {
    const result = await Notice.update(data, {
        where: {
            id
        }
    });
    return result[0];
}

module.exports = {
    getNoticeById,
    getNoticeByUserId,
    addNotice,
    deleteNotice,
    updateNotice
}
