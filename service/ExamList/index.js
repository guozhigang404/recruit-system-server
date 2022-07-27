const {ExamList, ExamPapers} = require("./../../models");

/**
 * 获取某个考试记录
 * @param id
 * @returns {Promise<null|any>}
 */
async function getExamById(id) {
    const ins = await ExamList.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

async function getExamByPage(page = 1, limit = 10, isDone = -1) {
    let where = {}
    if (isDone !== -1) {
        where.isDone = isDone
    }
    const result = await ExamList.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

/**
 * 添加考试记录
 * @param data [startTime] | [endTime] | idDone | [remark] | userId | examPaperId
 * @returns {Promise<null|any>}
 */
async function addExam(data) {
    const ins = await ExamList.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 删除考试记录
 * @param id
 * @returns {Promise<number>}
 */
async function deleteExam(id) {
    return await ExamList.destroy({
        where: {
            id
        }
    });
}

/**
 * 修改考试记录
 * @param id
 * @param data [startTime] | [endTime] | idDone | [remark] | userId | examPaperId
 * @returns {Promise<*>}
 */
async function updateExam(id, data) {
    const result = await ExamList.update(data, {
        where: {
            id
        }
    });
    return result[0];
}

async function getExamByUserId(userId, page = 1, limit = 10) {
    let result = await ExamList.findAndCountAll({
        where: {
            userId
        },
        include: [ExamPapers],
        offset: (page - 1) * limit,
        limit: +limit
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

async function updateExamByUserIdAndExamId(examPaperId, userId, data) {
    let result = await ExamList.update(data, {
        where: {
            userId,
            examPaperId
        }
    });
    return result[0];
}

module.exports = {
    getExamById,
    addExam,
    deleteExam,
    updateExam,
    getExamByPage,
    getExamByUserId,
    updateExamByUserIdAndExamId
}
