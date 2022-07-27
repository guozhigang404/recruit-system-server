const {Interview} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const {AssessmentResult, Resume, User} = require("../../service");
const router = express.Router();

// 获取面试列表
router.get("/interviews", async (req, resp, next) => {
    try {
        let userId = req.userId;
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt((req.query["limit"])) || 10;
        const interviewList = await Interview.getInterviewByUserId(userId, page, limit);
        resp.send(Result.getSuccessResult(interviewList))
    } catch (err) {
        next(err);
    }
});

// 通过面试
router.post("/admin/pass/:resultId", async (req, resp, next) => {
    try {
        let data = req.body;
        let result = await Interview.addInterview(data);
        let rId = req.params["resultId"]
        if (result) {
            await AssessmentResult.updateAssessmentResult(rId, {
                status: 2,
                isPass: 1
            })
            await Resume.updateResumeByUserId(data.userId, {
                status: 3
            })
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null, "添加失败"))
        }
    } catch (err) {
        next(err);
    }
})


router.put("/admin/unpass", async (req, resp, next) => {
    try {
        let {resultId, userId, reason} = req.body;
        // * 更新简历 0
        let r01 = await Resume.updateResumeByUserId(userId, {
            status: -1
        })
        // 更新考核结果
        let r02 = await AssessmentResult.updateAssessmentResult(resultId, {
            isPass: 0,
            status: 2
        });
        if (r01 >= 1 && r02 >= 1) {
            resp.send(Result.getSuccessResult(1))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err);
    }
})

// 获取面试详情
router.get("/admin/interviews/data", async (req, resp, next) => {
    try {
        let tel = req.query["tel"];
        let user = await User.getUserByTel(tel);
        if (user) {
            let userId = user.id;
            // 查询简历信息
            let resume = await Resume.getResumeByUserId(userId);
            if (resume) {
                let interview = await Interview.getInterviewByStatus(userId);
                if (interview) {
                    let data = {
                        user,
                        resume,
                        interview
                    };
                    resp.send(Result.getSuccessResult(data))
                } else {
                    resp.send(Result.getErrorResult())
                }
            } else {
                resp.send(Result.getErrorResult())
            }
        } else {
            resp.send(Result.getErrorResult())
        }
    } catch (err) {
        next(err);
    }
})

// 通过面试
router.put("/admin/interviews/pass", async (req, resp, next) => {
    try {
        let {resumeId, interviewId} = req.body;

        let resume = await Resume.updateResumeById(resumeId, {
            status: -1
        });
        let interview = await Interview.updateInterview(interviewId, {
            status: 1,
            result: 1
        });
        if (resume >= 1 && interview >= 1) {
            resp.send(Result.getSuccessResult(1))
        } else {
            resp.send(Result.getErrorResult())
        }

    } catch (err) {
        next(err)
    }
})

// 面试未通过
router.put("/admin/interviews/reject", async (req, resp, next) => {
    try {
        let {resumeId, interviewId, remark} = req.body;

        let resume = await Resume.updateResumeById(resumeId, {
            status: -1
        });
        let interview = await Interview.updateInterview(interviewId, {
            status: 0,
            result: 0,
            remark
        });
        if (resume >= 1 && interview >= 1) {
            resp.send(Result.getSuccessResult(1))
        } else {
            resp.send(Result.getErrorResult())
        }

    } catch (err) {
        next(err)
    }
})


module.exports = router;
