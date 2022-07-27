const User = require("./User");
const UserType = require("./UserType");
const SubjectiveQuestion = require("./SubjectiveQuestion");
const Resume = require("./Resume");
const ObjectiveQuestion = require("./ObjectiveQuestion");
// const Notice = require("./Notice");
const Interview = require("./Interview");
const ExamPapers = require("./ExamPapers");
const Blacklist = require("./Blacklist");
const AssessmentResult = require("./AssessmentResults");
const ExamList = require("./ExamList");
const RecruitmentInfo = require("./RecruitmentInfo");
// const QuestionType = require("./QuestionType");

/*
* 黑名单和用户表的关系
* 一对一
* BlackList 1
* User 1
* */
User.hasOne(Blacklist); // 外键在 Blacklist
Blacklist.belongsTo(User) // Blacklist

/*
* 用户和用户类别
* 一对多
* User 1
* UserType n
* */
UserType.hasMany(User) // 外键 在User
User.belongsTo(UserType); // 外键 在User

/*
* 用户和简历
* 一对多
* */
User.hasMany(Resume);
Resume.belongsTo(User)

/*
* 简历和招聘岗位
* 一对多
* */
RecruitmentInfo.hasMany(Resume);
Resume.belongsTo(RecruitmentInfo);

/*
* 用户和通知
* 一对多
* */
// User.hasMany(Notice); // 外键在 Notice
// Notice.belongsTo(User);

/*
* 用户和面试
* 一对一
* */
User.hasMany(Interview);
Interview.belongsTo(User);

/*
* 用户和 报名表
* 一对一
* */
User.hasOne(ExamList);
ExamList.belongsTo(User);

/*
* 试卷和报名表
* 一对多
* */
ExamPapers.hasMany(ExamList);
ExamList.belongsTo(ExamPapers);

/*
* 用户和考核结果
* 一对多
* */
User.hasMany(AssessmentResult);
AssessmentResult.belongsTo(User);

/*
* 试题和试题分类
* 一对多
* */
/*QuestionType.hasMany(SubjectiveQuestion);
SubjectiveQuestion.belongsTo(QuestionType);

QuestionType.hasMany(ObjectiveQuestion);
ObjectiveQuestion.belongsTo(QuestionType)*/
