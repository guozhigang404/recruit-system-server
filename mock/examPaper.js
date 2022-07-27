const Mock = require("mockjs");

const result = Mock.mock({
    "data|150-250": [
        {
            name: "@csentence(5, 8)",
            startTime: "2022-03-20 16:15:47",
            endTime: "2022-08-20 16:15:57",
            question: `{"objective":[{"id":1,"score":20},{"id":2,"score":20},{"id":4,"score":20},{"id":6,"score":20}],"subjective":[{"
id":2,"score":20}]}`,
            "strict|1-2": true,
        }
    ]
});

// console.log(result.data)
const {ExamPapers} = require("./../models");
require("./../models/relation");
ExamPapers.bulkCreate(result.data).then(data => {
    console.log("完成")
})
