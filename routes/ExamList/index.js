const {ExamList} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const router = express.Router();


router.get("/all", async (req, resp, next) => {
    try {
        let userId = req.userId;
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10
        let result = await ExamList.getExamByUserId(userId, page, limit);
        resp.send(Result.getSuccessResult(result));
    } catch (err) {
        next(err);
    }
})

module.exports = router;
