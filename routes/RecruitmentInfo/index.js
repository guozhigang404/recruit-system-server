const express = require("express");
const router = express.Router();
const {RecruitmentInfo} = require("./../../service");
const {Result} = require("./../../utils")
const {Resume} = require('../../service')

router.get("/", async (req, resp, next) => {
    try {
        const page = parseInt(req.query["page"]) || 1;
        const limit = parseInt(req.query["limit"]) || 10;
        const query = req.query["q"] || "";
        const result = await RecruitmentInfo.getRecruitmentInfoByPage(page, limit, query);
        resp.status(200).send(Result.getSuccessResult(result))
    } catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, resp, next) => {
    try {
        let id = req.params["id"];
        const data = await RecruitmentInfo.getRecruitmentInfoById(+id);
        resp.send(Result.getSuccessResult(data));
    } catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, resp, next) => {
    try {
        let formData = req.body["formData"];
        let id = req.params["id"];
        let rowNum = await RecruitmentInfo.updateRecruitmentInfo(id, formData);
        if(rowNum>=1) {
            resp.send(Result.getSuccessResult(rowNum))
        } else {
            resp.send(Result.getErrorResult(null, "fail", 400))
        }
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, resp, next) => {
    try {
        let jobId = req.params["id"];
        let exisResume = await Resume.getResumeByRecruitmentInfoId(1, 10, jobId);
        if(exisResume.total > 0) {
            resp.send(Result.getSuccessResult(0))
        } else {
            let result = await RecruitmentInfo.deleteRecruitmentInfoById(jobId);
            resp.send(Result.getSuccessResult(result))
        }
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, resp, next) => {
    try {
        let data = req.body;
        let result = await RecruitmentInfo.addRecruitmentInfo(data);
        if(result) {
            resp.send(Result.getSuccessResult(result))
        } else {
            resp.send(Result.getErrorResult(null,))
        }
    } catch (err) {
        next(err);
    }
})
module.exports = router;
