const {QuestionType} = require("./../../models");
const {Op} = require("sequelize")

/**
 * 根据id获取试题类型
 * @param id
 * @returns {Promise<null|any>}
 */
async function getQuestionTypeById(id) {
    const ins = await QuestionType.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 分页获取题目类型
 * @param page
 * @param limit
 * @param query
 * @returns {Promise<{total: Model<any, TModelAttributes>[], data: any}>}
 */
async function getQuestionTypeByPage(page = 1, limit = 10, query) {
    let where = {}
    if (query) {
        where.content = {
            [Op.like]: `%${query}%`
        }
    }
    const result = await QuestionType.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.rows,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 添加试题分类
 * @param data content
 * @returns {Promise<null|any>}
 */
async function addQuestionType(data) {
    const ins = await QuestionType.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 更新试题分类
 * @param id
 * @param data
 * @returns {Promise<*>}
 */
async function updateQuestionType(id, data) {
    const result = await QuestionType.update(data, {
        where: {
            id
        }
    });
    return result[0];
}

/**
 * 删除试题分类
 * @param id
 * @returns {Promise<number>}
 */
async function deleteQuestionType(id) {
    return await QuestionType.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    getQuestionTypeById,
    getQuestionTypeByPage,
    addQuestionType,
    updateQuestionType,
    deleteQuestionType
}
