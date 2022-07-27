const {ObjectiveQuestion} = require("./../../models");
const {Op} = require('sequelize')

/**
 * 获取指定的试题
 * @param id
 * @returns {Promise<null|any>}
 */
async function getQuestionById(id) {
    const ins = await ObjectiveQuestion.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 根据 试题类型 查询
 * @param page
 * @param limit
 * @param questionTypeId
 * @returns {Promise<{total: GroupedCountResultItem[], data: any}>}
 */
async function getQuestionByQuestionTypeId(page = 1, limit = 10, questionTypeId) {
    const result = await ObjectiveQuestion.findAndCountAll({
        where: {
            questionTypeId
        },
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 分页获取试题列表
 * @param page
 * @param limit
 * @param query
 * @returns {Promise<{total: Number, data: Array}>}
 */
async function getQuestionByPage(page = 1, limit = 10, query = '') {
    const result = await ObjectiveQuestion.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    content: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    label: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        },
        order: [
            ["createdAt", "DESC"]
        ],
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 添加简答题
 * @param data content | a | b | c | d | answer | questionTypeId | [ label ]
 * @returns {Promise<null|Object>}
 */
async function addQuestion(data) {
    const ins = await ObjectiveQuestion.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 更新试题
 * @param id
 * @param data [content] | [a] | [b] | [c] | [d] | [answer] | [questionTypeId] | [ label ]
 * @returns {Promise<Number>}
 */
async function updateQuestion(id, data) {
    const rows = await ObjectiveQuestion.update(data, {
        where: {
            id
        }
    });
    return rows[0];
}

/**
 * 删除试题
 * @param id
 * @returns {Promise<Number>}
 */
async function deleteQuestion(id) {
    return await ObjectiveQuestion.destroy({
        where: {
            id
        }
    })
}


module.exports = {
    getQuestionById,
    getQuestionByQuestionTypeId,
    getQuestionByPage,
    addQuestion,
    updateQuestion,
    deleteQuestion
}
