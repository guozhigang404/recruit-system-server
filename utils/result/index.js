function getSuccessResult(data, msg = "success", code = 0) {
    return {
        code,
        msg,
        data
    }
}

function getErrorResult(data = null, msg = "fail", code = 500) {
    return {
        code,
        msg,
        data
    }
}

module.exports = {
    getSuccessResult,
    getErrorResult
}
