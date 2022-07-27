class ErrorHandler {
    static errorNames = {
        // 数据已存在
        existsError: "existsError",
        // 数据验证未通过
        validateError: "validateError",
        // 未知的
        unknownError: "unknownError"
    }
    static createErrorIns(name, msg = "") {
        if (!this.errorNames[name]) {
            throw new Error(`错误类型: ${name} 没有定义`)
        }
        const errorIns = new Error();
        errorIns.name = name;
        errorIns.message = msg;
        return errorIns;
    }
}

module.exports = ErrorHandler;
