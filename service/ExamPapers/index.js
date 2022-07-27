const {Op} = require("sequelize")
const {ExamPapers} = require('../../models')

/**
 * 获取指定的 考试信息
 * @param id
 * @returns {Promise<null|any>}
 */
async function getExamPapers(id) {
    const ins = await ExamPapers.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 分页获取试卷
 * @param page
 * @param limit
 * @param query
 * @returns {Promise<{total: Number, data: Array}>}
 */
async function getExamPapersByPage(page = 1, limit = 10, query = '') {
    const result = await ExamPapers.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        },
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ["createdAt", "DESC"]

        ]
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 添加试卷
 * @param data name | startTime | endTime | question | strict
 * @returns {Promise<null|any>}
 */
async function addExamPapers(data) {
    const ins = await ExamPapers.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 更新试卷
 * @param id
 * @param data [name] | [startTime] | [endTime] | [question] | [strict]
 * @returns {Promise<*>}
 */
async function updateExamPapers(id, data) {
    const result = await ExamPapers.update(data, {
        where: {
            id
        }
    });
    return result[0]
}

/**
 * 删除试卷
 * @param id
 * @returns {Promise<number>}
 */
async function deleteExamPaper(id) {
    return await ExamPapers.destroy({
        where: {
            id
        }
    })
}


module.exports = {
    getExamPapers,
    getExamPapersByPage,
    addExamPapers,
    updateExamPapers,
    deleteExamPaper
}
