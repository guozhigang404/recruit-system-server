const Mock = require("mockjs");
const {RecruitmentInfo} = require("./../models")
const result = Mock.mock({
    "datas|80": [
        {
            "content|+1": [
                "前端工程师",
                "Java",
                "C++",
                "PHP",
                "数据挖掘",
                "算法",
                "DBA",
                "C#",
                "Node.js",
                "Python",
                "Go",
                "区块链",
                "全栈工程师",
                "ios",
                "HTML5",
                "Android",
                "自然语言处理",
                "运维工程师",
                "网络工程师",
                "测试开发",
                "测试工程师",
                "UI",
                "产品经理"
            ],
            "count|2-20": 0,
            "wages|9000-50000": 0,
            details: `-本科及以上学历
-精通各种Web前端技术（HTML/CSS/Javascript等)，熟悉跨浏览器、跨终端的开发
-熟练掌握React/Vue中的至少一种框架，有相关项目开发经验 
-熟悉前端工程化与模块化开发，并有相关实践经验(webpack/rollup/parcel等) 
-熟悉Linux系统，对算法、数据库、数据结构以及后台开发(Nodejs/PHP/Java等)有一定了解优先`
        }
    ]
});

RecruitmentInfo.bulkCreate(result.datas).then(() => {
    console.log("完成")
})
