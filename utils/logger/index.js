const log4js = require("log4js");
const path = require("path");

log4js.configure({
    appenders: {
        sql: { // * 配置出口
            type: "dateFile", // 文件名带上日期
            keepFileExt: true, // 保留原始的后缀名
            filename: path.resolve(__dirname, "./../../logs", "sql/logging.log"),
            maxLogSize: 1024 * 1024, // 单个日志文件最大的字节数
            numBackups: 2
        },
        error: {
            type: "dateFile", // 文件名带上日期
            keepFileExt: true, // 保留原始的后缀名
            filename: path.resolve(__dirname, "./../../logs", "error/logging.log"),
            maxLogSize: 1024 * 1024, // 单个日志文件最大的字节数
            numBackups: 2
        },
        default: {
            type: "stdout",
        }
    },
    categories: {
        // * 配置分类
        sql: {
            appenders: ["sql"], // 这个分类使用哪些出口
            level: "all" // 日志级别
        },
        error: {
            appenders: ["error"],
            level: "all"
        },
        default: {
            appenders: ["default"], // 这个分类使用哪些出口
            level: "all" // 日志级别
        }
    }
});

const sqlLogger = log4js.getLogger("sql");
const errorLogger = log4js.getLogger("error");
const logger = log4js.getLogger();

module.exports = {
    sqlLogger,
    logger,
    errorLogger
}
