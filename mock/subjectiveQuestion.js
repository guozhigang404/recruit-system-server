const Mock = require("mockjs");
const {SubjectiveQuestion} = require("./../models")

const result = Mock.mock({
    "data|200-240": [
        {
            "label|+1": [
                "c++", "c", "Java", "C#",
                "UI", "JavaScript", "ES6",
                "HTML5", "CSS3", "mysql", "nodejs",
                "webpack", "vue", "vue-router", "Linux",
                "sqlserver", "链表", "数据结构", "线性表", "二叉树",
                "单链表", "图"
            ],
            content: "@csentence(20, 200)",
            answer: "@csentence(5, 200)",
            "questionTypeId|+1": [1, 2, 3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16,
                17, 18, 19, 20, 21, 22]
        }
    ]
});

require("./../models/relation");
SubjectiveQuestion.bulkCreate(result.data).then(() => {
    console.log("ok")
})
