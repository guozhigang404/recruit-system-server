const {ErrorHandle, Result, Logger} = require("./../../utils");

module.exports = function (err, req, res, next) {
    if (!err) {
        next();
        return;
    }
    if (err.name === ErrorHandle.errorNames.existsError
        || err.name === ErrorHandle.errorNames.validateError) {
        const resData = Result.getErrorResult(err.message, "fail", 400);
        res.status(400).send(resData);
        return;
    }
    res.status(500).send(Result.getErrorResult(null, "服务器出现未知错误", 500))
    Logger.errorLogger.error(err);
}
