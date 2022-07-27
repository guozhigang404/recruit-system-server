const {AssessmentResult} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const {User} = require('../../service')
const router = express.Router();

// 获取考核结果
router.get("/", async (req, resp, next) => {
    try {
        let examId = req.query["examId"];
        let results = await AssessmentResult.getAssessmentResultsByUserId(req.userId);
        results = results.data;
        let respData = null;
        results.forEach(item => {
            if (item.examsId === +examId) {
                respData = item;
            }
        });
        resp.send(Result.getSuccessResult(respData))

    } catch (err) {
        next(err);
    }
})

// 获取某个考试的所有的考核结果（ 没有处理完成的） 评分
router.get("/admin/exam/:paperId", async (req, resp, next) => {
    try {
        let paperId = req.params["paperId"]
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let result = await AssessmentResult.getUnDoneResultByExamsId(paperId, page, limit);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

//更新简答题成绩
router.post("/admin/grade/:resultId", async (req, resp, next) => {
    let resultId = req.params["resultId"];
    let {subjective, total} = req.body;
    let result = await AssessmentResult.updateAssessmentResult(resultId, {
        subjective,
        total,
        status: 1
    });
    if (result >= 1) {
        resp.send(Result.getSuccessResult(result, "提交成功"))
    } else {
        resp.send(Result.getErrorResult(null, "提交失败"))
    }
})

// 获取已经完成线上测试审核的成绩单
router.get("/admin/results/:paperId", async (req, resp, next) => {
    try {
        let paperId = req.params["paperId"];
        console.log(paperId);
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let result = await AssessmentResult.getAssessmentResultsByExamsId(paperId, undefined, page, limit);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

// 用于统计成绩
router.get("/admin/results/statistics/:paperId", async (req, resp, next) => {
    try {
        let paperId = req.params["paperId"];
        console.log(paperId);
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let result = await AssessmentResult.getResultsByExamsId(paperId, undefined, page, limit);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

router.get("/admin/result/file/:paperId", async (req, resp, next) => {
    try{ 
        let paperId = req.params["paperId"];
        let url = await AssessmentResult.createExcelByPaperId(paperId);
        if(url !== null) {
            resp.send(Result.getSuccessResult(url))
        } else {
            resp.send(Result.getErrorResult(null, "生成失败"))
        }
    } catch(err) {
        next(err);
    }
})

router.get("/admin/userresult", async (req, resp, next) => {
    try {
        let paperId = req.query["paperId"];
        let tel = req.query["tel"];
        if (paperId && tel) {

            // 1. 根据手机号获取用户id
            //      如果用户为空，，返回null
            let user = await User.getUserByTel(+tel);
            if (!user) {
                // 没有这个用户
                resp.send(Result.getSuccessResult(
                    {
                        data: [],
                        total: 0
                    }
                ))
                return null;
            }

            // 2. 如果有用户，查看有没有对应的考试结果，
            let userId = user.id;
            let result = await AssessmentResult.getResultByPaperIdAndUserId(paperId, userId);
            resp.send(Result.getSuccessResult(result));

        } else {
            resp.send(Result.getErrorResult(null, "请指定考试和手机号"))
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
