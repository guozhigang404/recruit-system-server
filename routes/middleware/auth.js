const {pathToRegexp} = require("path-to-regexp");
const jwt = require("./../utils/JWT");
const {User} = require("./../../service")
const {Result} = require("./../../utils")

const whiteList = [
    {
        method: "GET",
        path: "/api/rinfo"
    },
    {
        method: "POST",
        path: "/api/user/login"
    },
    {
        method: "POST",
        path: "/api/user"
    }
]


module.exports = function (req, resp, next) {
    const whiteLength = whiteList.filter(item => {
        const reg = pathToRegexp(item.path);
        return item.method === req.method && reg.test(req.path);
    }).length;
    if (whiteLength !== 0) {
        next();
        return null;
    }
    const authResult = jwt.verify(req);
    if (authResult) {
        let userId = authResult.userId;
        User.getUserById(userId).then(userData => {
            if (userData) {
                // * 验证通过
                req.userId = userId;
                next();
            } else {
                // 验证未通过
                resp.status(403).send(Result.getErrorResult(null, "身份信息无效", 403))
            }
        })
    } else {
        // 验证未通过
        resp.status(403).send(Result.getErrorResult(null, "身份信息无效", 403))
    }
}
