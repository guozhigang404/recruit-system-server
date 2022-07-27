const {Notice} = require("./../../service");
const {Result} = require("./../../utils")
const express = require("express");
const router = express.Router();

router.get("/", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let query = req.query["query"] || "";
        let userId = req.userId
        const result = await Notice.getNoticeByUserId(userId, +page, +limit, query)
        resp.send(Result.getSuccessResult(result));
    } catch (err) {
        next(err);
    }
});

router.put("/read/:id", async (req, resp, next) => {
    try {
        const result = await Notice.updateNotice(req.params["id"], {
            read: 1
        });
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

module.exports = router;
