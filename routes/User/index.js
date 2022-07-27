const { User, Blacklist, Resume } = require("./../../service");
const { Result } = require("./../../utils")
const express = require("express");
const router = express.Router();
const jwt = require("./../utils/JWT")
const multer = require("multer");
const path = require("path")

// 上传照片
let photoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/photo"));
    },
    // destination: path.resolve(__dirname, "../../public/photo"),
    filename: async function (req, file, cb) {
        // 时间戳-6位随机字符.文件后缀
        let user = await User.getUserById(req.userId);
        const timeStamp = Date.now();
        // const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        // const filename = `${timeStamp}-${randomStr}${ext}`;
        let filename = `${user.id}-${user.tel}${ext}`
        cb(null, filename);
    },
});
const uploadPhoto = multer({
    storage: photoStorage,
    limits: {
        fileSize: 1500 * 1024,
    },
    fileFilter(req, file, cb) {
        //验证文件后缀名
        const extname = path.extname(file.originalname);
        const whitelist = [".jpg", ".gif", ".png", ".jpeg"];
        if (whitelist.includes(extname)) {
            cb(null, true);
        } else {
            cb(new Error(`your ext name of ${extname} is not support`));
        }
    },
});
router.post("/uploadphoto", uploadPhoto.single("photo"), async (req, resp, next) => {
    try {
        if (req.file.filename) {
            let url = `/photo/${req.file.filename}`
            let userId = req.userId;
            await User.updateUser(userId, {
                photo: url
            })
            resp.send(Result.getSuccessResult(url));
        } else {
            resp.send(Result.getErrorResult(null, "保存失败"))
        }
    } catch (err) {
        next(err);
    }
})

// 上传简历
let resumeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "../../public/pdf"));
    },
    // destination: path.resolve(__dirname, "../../public/photo"),
    filename: async function (req, file, cb) {
        // 时间戳-6位随机字符.文件后缀
        let user = await User.getUserById(req.userId);
        const timeStamp = Date.now();
        // const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname);
        // const filename = `${timeStamp}-${randomStr}${ext}`;
        let filename = `${user.id}-${user.tel}${ext}`
        cb(null, filename);
    },
})
let uploadResume = multer(
    {
        storage: resumeStorage
    }
)
router.post("/uploadresume", uploadResume.single("resume"), async (req, resp, next) => {
    try {
        let resumeUrl = `/pdf/${req.file.filename}`
        let result = await Resume.updateResumeByUserId(req.userId, {
            path: resumeUrl
        })
        resp.send(Result.getSuccessResult(resumeUrl))
    } catch (err) {
        next(err);
    }
});

// 获取单个用户信息
router.get("/:id", async (req, resp, next) => {
    try {
        const id = req.params["id"];
        const user = await User.getUserById(id);
        if (user) {
            resp.send(Result.getSuccessResult(user))
        } else {
            resp.send(Result.getErrorResult(null, "用户不存在", 400))
        }
    } catch (err) {
        next(err);
    }
});

// 登录
router.post("/login", async (req, resp, next) => {
    // console.log(req.ip)
    const { loginId, loginPwd } = req.body;
    if (loginId && loginPwd) {
        try {
            const result = await User.login(loginId, loginPwd);
            if (result) {
                if (result.isBlack) {
                    resp.send(Result.getErrorResult(null, "已经被加入黑名单", 406));
                    return;
                }
                delete result.createdAt;
                delete result.deletedAt;
                jwt.publish(resp, {
                    userId: result.id
                })
                resp.send(Result.getSuccessResult(result))
            } else {
                resp.send(Result.getErrorResult(null, "账号或用户名错误", 400))
            }
        } catch (err) {
            next(err)
        }
    } else {
        const resData = Result.getErrorResult(null, "用户名或密码为空,请确保数据的完整", 400);
        resp.send(resData)
    }
})

// 恢复登录信息
router.get("/auth/whoami", async (req, resp, next) => {
    try {
        let black = await Blacklist.getBlackUserByUserId(req.userId);
        if (black) {
            resp.send(Result.getErrorResult(null, "已进入黑名单", 406));
            return;
        }
        const result = await User.getUserById(req.userId);
        if (result.photo) {
            result.photo = result.photo + `?r=${Math.random()}`
        }
        delete result.user_type.deletedAt;
        delete result.user_type.createdAt;
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err)
    }
});

// 注册
router.post("/", async (req, resp, next) => {
    try {
        let { name, loginPwd, tel, sex } = req.body;
        if (name && loginPwd && tel && sex) {
            const result = await User.register({
                name,
                loginPwd,
                tel,
                sex: parseInt(sex),
                userTypeId: 3
            });
            if (result) {
                resp.send(Result.getSuccessResult(
                    {
                        id: result.id
                    }
                ))
            } else {
                resp.send(Result.getErrorResult(null, "注册失败", 400))
            }
        } else {
            resp.send(Result.getErrorResult(null, "数据不完整", 400))
        }

    } catch (e) {
        next(e);
    }
})

// 更新用户信息
router.put("/update/base", async (req, resp, next) => {
    try {
        let userId = req.userId;
        let result = await User.updateUser(userId, req.body);
        resp.send(Result.getSuccessResult(result))
    } catch (err) {
        next(err)
    }
});

// 设置用户分类
router.put("/admin/update/usertype/:id", async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id);
        let data = req.body;
        let result = await User.updateUser(userId, data);
        console.log(userId, data)
        if(result >= 1) {
            res.send(Result.getSuccessResult(result))
        } else {
            res.send(Result.getErrorResult(0, "fail", 400))
        }
    } catch (e) {
        next(e);
    }
})

// 分页获取用户列表
router.get("/", async (req, resp, next) => {
    try {
        let page = parseInt(req.query["page"]) || 1;
        let limit = parseInt(req.query["limit"]) || 10;
        let q = req.query["q"] || '';
        let result = await User.getUserByPage(page, limit, -1, q, req.userId);
        resp.send(Result.getSuccessResult(result))
    } catch (e) {
        next(e);
    }
})

module.exports = router;
