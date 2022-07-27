const Mock = require("mockjs");
const {QuestionType} = require("./../models")

const result = Mock.mock({
    'data|22': [
        {
            "content|+1": [
                "c++", "c", "Java", "C#",
                "UI", "JavaScript", "ES6",
                "HTML5", "CSS3", "mysql", "nodejs",
                "webpack", "vue", "vue-router", "Linux",
                "sqlserver", "链表", "数据结构", "线性表", "二叉树",
                "单链表", "图"
            ]
        }
    ]
});
console.log(result.data.length);

QuestionType.bulkCreate(result.data).then(() => {
    console.log("ok")
})
