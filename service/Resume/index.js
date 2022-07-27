const {Resume, User, RecruitmentInfo} = require("./../../models");

/**
 * 通过id 获取简历信息
 * @param id 编号
 * @returns {Promise<null|any>}
 */
async function getResumeById(id) {
    const result = await Resume.findByPk(id, {
        include: [User, RecruitmentInfo]
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 获取指定用户的简历信息
 * @param userId
 * @returns {Promise<null|*>}
 */
async function getResumeByUserId(userId) {
    const result = await Resume.findOne({
        where: {
            userId
        },
        include: [RecruitmentInfo]
    });
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 获取某个岗位下的简历
 * @param page 页码
 * @param limit 页容量
 * @param recruitmentInfoId 岗位 id
 * @returns {Promise<{total: Number, data: Array}>}
 */
async function getResumeByRecruitmentInfoId(page = 1, limit = 10, recruitmentInfoId) {
    const result = await Resume.findAndCountAll({
        where: {
            recruitmentInfoId
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
 * 添加简历
 * @param data path | salary | userId | recruitmentInfoId
 * @returns {Promise<null|any>}
 */
async function addResume(data) {
    const result = await Resume.create(data);
    if (result) {
        return result.toJSON();
    }
    return null;
}

/**
 * 更新指定用户的简历信息
 * @param userId 用户id
 * @param data 新的数据
 * @returns {Promise<*>}
 */
async function updateResumeByUserId(userId, data) {
    const ins = await Resume.update(data, {
        where: {
            userId
        }
    });
    return ins[0];
}

/**
 * 根据id 更新指定用户的简历
 * @param id 用户id
 * @param data 新的数据
 * @returns {Promise<*>}
 */
async function updateResumeById(id, data) {
    const ins = await Resume.update(data, {
        where: {
            id
        }
    });
    return ins[0];
}

async function getNewApply(page = 1, limit = 10) {
    let resumes = await Resume.findAndCountAll({
        where: {
            status: 1
        },
        offset: (page - 1) * limit,
        limit: +limit,
        include: [User, RecruitmentInfo],
        order: [
            ["updatedAt", "DESC"]
        ]
    });
    return {
        total: resumes.count,
        data: JSON.parse(JSON.stringify(resumes.rows))
    }
}

module.exports = {
    getResumeById,
    getResumeByUserId,
    getResumeByRecruitmentInfoId,
    addResume,
    updateResumeByUserId,
    updateResumeById,
    getNewApply
}
