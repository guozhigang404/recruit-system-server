const {Resume} = require("./../models");
const Mock = require("mockjs");

const result = Mock.mock({
    "datas|120": [
        {
            path: "https://img2.baidu.com/it/u=790045287,958560532&fm=26&fmt=auto",
            "salary|8000-100000": 0,
            "userId|+1": 1,
            "recruitmentInfoId|1-7": 0
        }
    ]
})

require("./../models/relation");

Resume.bulkCreate(result.datas).then(data => {
    console.log("完成")
})
