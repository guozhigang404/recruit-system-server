const { RecruitmentInfo } = require("./../../models");
const { Op } = require("sequelize")

/**
 * 分页获取招聘岗位信息
 * @param page
 * @param limit
 * @param query
 * @param orderRule 根据 createdAt排序 DESC——降序 | ACS——升序
 * @returns {Promise<null|{total, data: any}>}
 */
async function getRecruitmentInfoByPage(
    page = 1,
    limit = 10,
    query = "",
    orderRule = "DESC"
    ) {
    let where = {};
    if (query) {
        where.content = {
            [Op.like]: `%${query}%`
        }
    }
    const result = await RecruitmentInfo.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ["createdAt", orderRule]
        ]
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 根据id获取招聘信息
 * @param id 编号
 * @returns {Promise<any>}
 */
async function getRecruitmentInfoById(id) {
    const result = await RecruitmentInfo.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null
}

/**
 * 根据id删除信息
 * @param id
 * @returns {Promise<number>}
 */
async function deleteRecruitmentInfoById(id) {
    return await RecruitmentInfo.destroy({
        where: {
            id
        }
    });
}

/**
 * 更新招聘信息
 * @param id 编号
 * @param data 新的数据
 * @returns {Promise<*>}
 */
async function updateRecruitmentInfo(id, data) {
    const result = await RecruitmentInfo.update(data, {
        where: {
            id
        }
    });
    return result[0];
}

/**
 * 添加招聘信息
 * @param data 数据
 * @returns {Promise<null|any>}
 */
async function addRecruitmentInfo(data) {
    const result = await RecruitmentInfo.create(data);
    if (result) {
        return result.toJSON();
    }
    return null;
}

module.exports = {
    getRecruitmentInfoByPage,
    getRecruitmentInfoById,
    deleteRecruitmentInfoById,
    updateRecruitmentInfo,
    addRecruitmentInfo
}
