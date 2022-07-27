const { AssessmentResult } = require("./../../models")
const { User } = require('../../models')
const { Op } = require("sequelize")
const ExcelJS = require('exceljs');
const path = require("path")

/**
 * 获取考核结果
 * @param id
 * @returns {Promise<null|any>}
 */
async function getAssessmentResultById(id) {
    const ins = await AssessmentResult.findByPk(id);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 获取考核结果，
 * @param userId
 * @param orderRule 根据 createdAt排序 DESC——降序 | ACS——升序
 * @param page
 * @param limit
 * @returns {Promise<{total: number, data: array}>}
 */
async function getAssessmentResultsByUserId(userId, orderRule = "DESC", page = 1, limit = 10) {
    const data = await AssessmentResult.findAndCountAll({
        where: {
            userId
        },
        order: [
            ["createdAt", orderRule]
        ],
        offset: (page - 1) * limit,
        limit: +limit
    });

    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}

/**
 * 获取某次考核的结果
 * @param examsId
 * @param orderRule 根据 createAt排序 DESC——降序 | ACS——升序
 * @param page
 * @param limit
 * @returns {Promise<{total: number, data: array}>}
 */
async function getAssessmentResultsByExamsId(examsId, orderRule = "DESC", page = 1, limit = 10) {
    const data = await AssessmentResult.findAndCountAll({
        where: {
            examsId,
            status: 1 // 已经完成简答题判分，准备进入面试审核阶段
        },
        order: [
            ["total", orderRule]
        ],
        offset: (page - 1) * limit,
        limit: +limit,
        include: [User]

    });

    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}

async function getResultsByExamsId(examsId, orderRule = "DESC", page = 1, limit = 10) {
    const data = await AssessmentResult.findAndCountAll({
        where: {
            examsId,
            status: {
                [Op.or]: [1, 2]
            }
        },
        order: [
            ["total", orderRule]
        ],
        offset: (page - 1) * limit,
        limit: +limit,
        include: [User]

    });

    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}

/**
 * 获取某次考核的结果
 * @param examsId
 * @param page
 * @param limit
 * @returns {Promise<{total: number, data: array}>}
 */
async function getUnDoneResultByExamsId(examsId, page = 1, limit = 10) {
    const data = await AssessmentResult.findAndCountAll({
        where: {
            examsId,
            status: -1
        },
        offset: (page - 1) * limit,
        limit: +limit,
        include: [User]
    });

    return {
        total: data.count,
        data: JSON.parse(JSON.stringify(data.rows))
    }
}


/**
 * 添加考核结果
 * @param data examsId-考试Id | answer-考生提交的答案 | objective-选择题成绩
 * | subjective-简答题成绩 | total-总成绩 | isPass-是否通过 | userId
 * @returns {Promise<null|any>}
 */
async function addAssessmentResult(data) {
    const ins = await AssessmentResult.create(data);
    if (ins) {
        return ins.toJSON();
    }
    return null;
}

/**
 * 删除考核结果
 * @param id
 * @returns {Promise<number>}
 */
async function deleteAssessmentResult(id) {
    return await AssessmentResult.destroy({
        where: {
            id
        }
    })
}

/**
 * 更新考核结果
 * @param id
 * @param data examsId-考试Id | answer-考生提交的答案 | objective-选择题成绩
 * | subjective-简答题成绩 | total-总成绩 | isPass-是否通过 | userId
 * @returns {Promise<*>}
 */
async function updateAssessmentResult(id, data) {
    const result = await AssessmentResult.update(data, {
        where: {
            id
        }
    });
    return result[0]
}


async function getResultByPaperIdAndUserId(paperId, userId) {
    let result = await AssessmentResult.findAndCountAll({
        where: {
            examsId: paperId,
            userId
        },
        include: [User]
    });
    return {
        data: JSON.parse(JSON.stringify(result.rows)),
        total: result.count
    }
}

async function createExcelByPaperId(examsId) {
    let data = await AssessmentResult.findAndCountAll({
        where: {
            examsId,
            status: {
                [Op.or]: [1, 2]
            }
        },
        order: [
            ["total", "DESC"]
        ],
        include: [User]
    });
    data = JSON.parse(JSON.stringify(data.rows));
    if (data.length <= 0) {
        return null;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('成绩单');
    sheet.columns = [
        {
            header: '姓名',
            key: "name",
            width: 20
        },
        {
            header: '手机号',
            key: "tel",
            width: 20
        },
        {
            header: '选择题成绩',
            key: "obj",
            width: 20
        },
        {
            header: '简答题成绩',
            key: "sub",
            width: 20
        },
        {
            header: '总成绩',
            key: "total",
            width: 20
        },
    ];
    const rows = [];
    data.forEach(item => {
        rows.push(
            [item.user.name, item.user.tel, item.objective, item.subjective, item.total]
        )
    });
    console.log(rows)
    sheet.addRows(rows);
    let filename = path.resolve(__dirname, "../../public/excel/grade.xlsx")
    await workbook.xlsx.writeFile(filename);
    return "/excel/grade.xlsx"
}

module.exports = {
    getAssessmentResultById,
    getAssessmentResultsByUserId,
    getAssessmentResultsByExamsId,
    deleteAssessmentResult,
    addAssessmentResult,
    updateAssessmentResult,
    getUnDoneResultByExamsId,
    getResultByPaperIdAndUserId,
    getResultsByExamsId,
    createExcelByPaperId
}
