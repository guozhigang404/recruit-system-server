require("./UserType");
require("./User");
require("./Blacklist");
require("./AssessmentResults");
require("./ExamList");
require("./ExamPapers");
require("./Interview");
require("./ObjectiveQuestion");
require("./Resume")
require("./SubjectiveQuestion")
require("./RecruitmentInfo")
require("./relation");
// require("./Notice");
// require("./QuestionType")


const sequelize = require("./db");
sequelize.sync({alter: true}).then(() => {
    console.log("所有模型同步完成");
});
