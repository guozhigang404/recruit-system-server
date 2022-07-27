const {ExamList, ExamPagers, ObjectiveQuestion, SubjectiveQuestion, AssessmentResult} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const {updateExamByUserIdAndExamId} = require('../../service/ExamList')
const router = express.Router();

router.get("/questions/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let examPaper = await ExamPagers.getExamPapers(id);
        let questionInfo = JSON.parse(examPaper.question)
        let objective = []
        for (let i = 0; i < questionInfo.objective.length; i++) {
            let question = await ObjectiveQuestion.getQuestionById(questionInfo.objective[i].id);
            question.score = questionInfo.objective[i].score;
            question.type = 1
            delete question.answer;
            objective.push(question);
        }
        let subjective = [];
        for (let i = 0; i < questionInfo.subjective.length; i++) {
            let question = await SubjectiveQuestion.getQuestionById(questionInfo.subjective[i].id);
            question.score = questionInfo.subjective[i].score;
            delete question.answer;
            question.type = 0
            subjective.push(question);
        }
        let respData = {
            objective,
            subjective
        }
        resp.send(Result.getSuccessResult(respData))
    } catch (err) {
        next(err);
    }
})

router.get("/admin/questions/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let examPaper = await ExamPagers.getExamPapers(id);
        let questionInfo = JSON.parse(examPaper.question)
        let objective = []
        for (let i = 0; i < questionInfo.objective.length; i++) {
            let question = await ObjectiveQuestion.getQuestionById(questionInfo.objective[i].id);
            question.score = questionInfo.objective[i].score;
            question.type = 1
            objective.push(question);
        }
        let subjective = [];
        for (let i = 0; i < questionInfo.subjective.length; i++) {
            let question = await SubjectiveQuestion.getQuestionById(questionInfo.subjective[i].id);
            question.score = questionInfo.subjective[i].score;
            question.type = 0
            subjective.push(question);
        }
        let respData = {
            objective,
            subjective
        }
        resp.send(Result.getSuccessResult(respData))
    } catch (err) {
        next(err);
    }
})

// 提交答卷
router.post("/submit/:id", async (req, resp, next) => {
    try {
        let reqData = req.body;

        let objScore = 0;
        let id = req.params["id"];
        let userId = req.userId;
        let examPaper = await ExamPagers.getExamPapers(id);
        let questionInfo = JSON.parse(examPaper.question)

        for (let i = 0; i < questionInfo.objective.length; i++) {
            let item = questionInfo.objective[i];
            let question = await ObjectiveQuestion.getQuestionById(item.id);
            let answer = JSON.parse(question.answer)[0];
            reqData.answer.objAnswer.forEach(objItem => {
                if (item.id === objItem.id && objItem.answer === answer) {
                    objScore += item.score;
                }
            })
        }
        let ins = await AssessmentResult.addAssessmentResult({
            examsId: id,
            userId,
            status: -1,
            isPass: 0,
            objective: objScore,
            answer: JSON.stringify(reqData.answer)
        });

        let startTime = reqData.startTime;
        let endTime = reqData.endTime;
        await updateExamByUserIdAndExamId(id, userId, {
            startTime,
            endTime,
            isDone: 1,
            status: 1
        })

        resp.send(Result.getSuccessResult(ins))
    } catch (err) {
        next(err);
    }
})

// 获取所有答卷
router.get("/", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let q = req.query["q"] || '';
        let result = await ExamPagers.getExamPapersByPage(page, limit, q);
        resp.send(Result.getSuccessResult(result));

    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, resp, next) => {
    try {
        let data = req.body;
        let result = await ExamPagers.addExamPapers(data);
        if(result) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult())
        }
    } catch (e) {
        next(e);
    }
})

module.exports = router;
