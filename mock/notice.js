const Mock = require("mockjs");

const result = Mock.mock({
    "data|150-250": [
        {
            content: "@csentence(5, 300)",
            "read|1-2": true,
            "userId|1-16": 0
        }
    ]
});

const {Notice} = require("./../models");
require("./../models/relation");
Notice.bulkCreate(result.data)
