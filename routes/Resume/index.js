const {Resume, RecruitmentInfo, ExamList,Interview} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const router = express.Router();

router.get("/:userId", async (req, resp, next) => {
    try {
        let userId = req.params["userId"];
        const resume = await Resume.getResumeByUserId(+userId);
        resp.send(Result.getSuccessResult(resume))
    } catch (err) {
        next(err);
    }
})

router.get("/apply/p", async (req, resp, next) => {
    try {
        let userId = req.userId;
        let result = {}
        let resume = await Resume.getResumeByUserId(userId);
        /*
        * 简历 state -1 未通过 读取 remark
        * 0 旧的申请
        * 1 新申请
        * 2 审核通过，进入考试，
        * 3 进入面试
        * 4 考核通过
        * */

        // if(resume) {
        //
        // }

    } catch (err) {
        next(err);
    }
})
// * 申请职位
router.put("/:userId", async (req, resp, next) => {
    try {
        let userId = req.params["userId"];
        let recruitmentInfoId = req.body["recruitmentInfoId"]
        const rInfo = await RecruitmentInfo.getRecruitmentInfoById(recruitmentInfoId);
        if (rInfo) {

            const resumeData = await Resume.getResumeByUserId(userId);
            console.log(userId)
            if (resumeData.status >= 1) {
                resp.send(Result.getErrorResult(null, "fail", 406))
                return;
            }

            const result = await Resume.updateResumeByUserId(userId, {
                recruitmentInfoId,
                isPass: 0,
                remark: null,
                status: 1
            });
            if (result === 1) {
                resp.send(Result.getSuccessResult(result))
            } else {
                resp.send(Result.getErrorResult(null, "申请失败", 400))
            }
        } else {
            resp.send(Result.getErrorResult(null, "此职位不存在", 400))
        }
    } catch (err) {
        next(err);
    }
})

router.get("/admin/apply", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"])|| 10;
        let result = await Resume.getNewApply(page, limit);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

router.get("/admin/apply/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let result = await  Resume.getResumeById(id);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

router.put("/admin/apply/pass", async (req, resp, next) => {
    try {
        let userId = req.body["userId"];
        let examPaperId = req.body["examId"];
        let resumeId = req.body["resumeId"];
        let resumeResult = await Resume.updateResumeById(resumeId, {
            isPass: 0,
            status: 2
        });
        let examPaperResult = await ExamList.addExam({
            isDone: 0,
            userId,
            examPaperId,
            status: -1
        });
        if(examPaperResult && resumeResult >= 1) {
            resp.send(Result.getSuccessResult(1))
        } else {
            resp.send(Result.getErrorResult(null, "fail", 400))
        }
    } catch (err) {
        next(err);
    }
})

// 拒绝申请
router.put("/admin/apply/reject", async (req, resp, next) => {
    try {
        let resumeId = req.body["resumeId"];
        let remark = req.body["remark"]
        let result = await  Resume.updateResumeById(resumeId, {
            isPass: 0,
            status: -1,
            remark
        });
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

module.exports = router;
