const {UserType} = require("./../../service");
const ResultHandle = require("./../../utils/result");
const express = require("express");
const router = express.Router();

// 获取所有UserType
router.get("/", async (req, res, next) => {
    try {
        const result = await UserType.getAll();
        const data = ResultHandle.getSuccessResult(result);
        res.status(200).send(data);
    } catch (err) {
        next(err)
    }
})

// 添加
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        if(data.name) {
            const result = await UserType.add(data);
            const resData = ResultHandle.getSuccessResult(result);
            res.status(200).send(resData)
        } else {
            const resData = ResultHandle.getErrorResult(null, "fail", 400);
            res.status(400).send(resData)
        }
    } catch (err) {
        console.log(err)
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params["id"];
    try {
        if(id) {
            const result = await UserType.deleteUserType(+id);
            const resData = ResultHandle.getSuccessResult(result);
            res.status(200).send(resData)
        } else {
            const resData =  ResultHandle.getErrorResult(null, "数据不完整", 400);
            res.status(400).send(resData)
        }
    } catch (err) {
        console.log(err)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const result = await UserType.update(req.params.id, req.body);
        const resData = ResultHandle.getSuccessResult(result);
        res.status(200).send(resData);
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;
