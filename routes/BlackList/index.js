const { Blacklist } = require("./../../service");
const { Result } = require("./../../utils")
const express = require("express");
const router = express.Router();

router.get("/user/:id", async (req, resp,next) => {
    try {
        let userId = req.params["id"];
        let result = await Blacklist.getBlackUserByUserId(userId);
        resp.send(Result.getSuccessResult(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, resp, next) => {
    try {
        // let userId = req.body["userId"];
        let result = await Blacklist.addBlacklist(req.body);
        if(result) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null))
        }
    } catch (err) {
        next(err);
    }
})

router.delete("/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        let result = await Blacklist.deleteBlacklistById(id);
        if(result >= 1) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult())
        }
    } catch (err) {
        next(err);
    }
})

router.get("/admin/all", async (req, resp, next) =>{
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let result = await Blacklist.getAllBlackList(page, limit, '');
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

module.exports = router;
