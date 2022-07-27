const {Interview} = require("./../../models");
const {Op} = require("sequelize")

/**
 * 获取某个面试记录
 * @param id
 * @returns {Promise<null|any>}
 */
async function getInterviewById(id) {
    const ins = await Interview.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 分页获取面试记录
 * @param page 页码
 * @param limit 页容量
 * @param result 面试是否通过 -1——不根据此条件查询 | 1——通过 | 0 —— 未通过
 * @param query 模糊查询关键词，根据address模糊查询
 * @returns {Promise<{total: number, data: array}>}
 */
async function getInterviewByPage(page = 1, limit = 10, result = -1, query = "") {
    let where = {
        address: {
            [Op.like]: `%${query}%`
        }
    }
    if (result === 1 || result === 0) {
        where.result = result;
    }
    const data = await Interview.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}

/**
 * 获取某个用户面试记录
 * @param userId 用户 id
 * @param page 页码
 * @param limit 页容量
 * @param orderRule 排序规则，根据面试时间排序。DESC——降序 | ACS——升序
 * @returns {Promise<void>}
 */
async function getInterviewByUserId(userId, page = 1, limit = 10, orderRule = "DESC") {
    const data = await Interview.findAndCountAll({
        where: {
            userId
        },
        order: [
            ["time", orderRule]
        ],
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}

/**
 * 添加一条面试记录
 * @param data time | userId | [address] | [result] | [remark]
 * @returns {Promise<null|any>}
 */
async function addInterview(data) {
    const ins = await Interview.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 更新面试记录
 * @param id
 * @param data [time] | [address] | [result] | [remark]
 * @returns {Promise<*>}
 */
async function updateInterview(id, data) {
    const result = await Interview.update(data, {
        where: {
            id
        }
    });
    return result[0]
}

/**
 * 删除一条面试记录
 * @param id
 * @returns {Promise<number>}
 */
async function deleteInterview(id) {
    return await Interview.destroy({
        where: {
            id
        }
    })
}


async function getInterviewByStatus(userId) {
    let ins = await Interview.findOne({
        where: {
            userId,
            status: -1
        }
    });
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

module.exports = {
    getInterviewById,
    getInterviewByPage,
    getInterviewByUserId,
    addInterview,
    updateInterview,
    deleteInterview,
    getInterviewByStatus
}
