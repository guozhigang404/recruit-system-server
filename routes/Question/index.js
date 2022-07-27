const {ObjectiveQuestion, SubjectiveQuestion} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const router = express.Router();

router.get("/objective", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let q = req.query["q"] || '';
        let result = await ObjectiveQuestion.getQuestionByPage(page, limit, q);
        resp.send(Result.getSuccessResult(result));
    } catch (err) {
        next(err)
    }
})

router.get("/subjective", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let q = req.query["q"] || '';
        let result = await SubjectiveQuestion.getQuestionByPage(page, limit, q);
        resp.send(Result.getSuccessResult(result));
    } catch (err) {
        next(err)
    }
})

router.delete("/objective/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"]
        let result = await ObjectiveQuestion.deleteQuestion(id);
        if(result >= 1) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err);
    }
})

router.delete("/subjective/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"]
        let result = await SubjectiveQuestion.deleteQuestion(id);
        if(result >= 1) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err);
    }
})

router.put("/objective/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let result = await ObjectiveQuestion.updateQuestion(id, req.body);
        if(result >= 1) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err)
    }
})

router.put("/subjective/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let result = await SubjectiveQuestion.updateQuestion(id, req.body);
        if(result >= 1) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err)
    }
})

router.post("/objective", async (req, resp,next) => {
    try {
        let data = req.body;
        let result = await ObjectiveQuestion.addQuestion(data);
        if(result) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult())
        }
    } catch (err) {
        next(err);
    }
})

router.post("/subjective", async (req, resp,next) => {
    try {
        let data = req.body;
        let result = await SubjectiveQuestion.addQuestion(data);
        if(result) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult())
        }
    } catch (err) {
        next(err);
    }
})

module.exports = router;
