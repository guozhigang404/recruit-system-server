const express = require("express");
const systemConfig = require("./../config/system.json")
const app = express();

// 静态资源
// const history = require("connect-history-api-fallback");
// app.use(history());
const staticHandle = require("./middleware/static");
app.use(staticHandle);

// 跨域
const cors = require("cors")
const whiteList = systemConfig.cors;
app.use(
    cors({
        origin(origin, callback) {
            if (!origin) {
                callback(null, "*");
                return;
            }
            if (whiteList.includes(origin)) {
                callback(null, origin);
            } else {
                callback(new Error("not allowed"));
            }
        },
        credentials: true,
    })
);

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({extended: true}));

// 解析 application/json 格式的请求体
app.use(express.json());

// 权限验证中间件
const auth = require("./middleware/auth")
app.use(auth)

// 路由
const userTypeRouter = require("./UserType");
app.use("/api/usertype", userTypeRouter)

const userRouter = require("./User");
app.use("/api/user", userRouter);

const recruitmentInfoRouter = require("./RecruitmentInfo");
app.use("/api/rinfo", recruitmentInfoRouter);

const resumeRouter = require("./Resume");
app.use("/api/resume", resumeRouter);

let examListRouter = require("./ExamList")
app.use("/api/examlist", examListRouter);

let aResultRouter = require("./AssessmentResult");
app.use("/api/aresult", aResultRouter)

let examPaper = require("./ExamPaper");
app.use("/api/exampaper", examPaper);

let interviewRouter = require("./Interview");
app.use("/api/interview", interviewRouter);

let blackListRouter = require("./BlackList");
app.use("/api/blacklist", blackListRouter)

let questionRouter = require("./Question");
app.use("/api/question", questionRouter);

// 错误处理中间件
const errorHandle = require("./middleware/errorHandle");
app.use(errorHandle);

app.listen(systemConfig.port, () => {
    console.log(`listening: ${systemConfig.port}`)
})
