const Mock = require("mockjs");

Mock.Random.extend({
    phone: function () {
        var phonePrefixs = ['132',
            '135', '189', "150", "151",
            "156", "134", "130", "131",
        "188", "177", "170"]
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
})


const result = Mock.mock({
    "datas|200-300": [
        {
            name: "@cname",
            birth: "@date",
            loginPwd: "e10adc3949ba59abbe56e057f20f883e",
            email: "@email",
            tel: "@phone",
            "sex|1-2": true,
            address: "@county(true)",
            "major|1": ["计算机科学与技术", "软件工程", "大数据", "物联网", "软件技术"],
            "university|1": ["沧州师范学院",
                "石家庄学院", "河北师范大学",
                "河北工业大学", "河北科技大学",
                "河北农业大学", "保定学院",
                "河北水利电力学院",
            ],
            "qualifications|1": ["本科", "研究生"],
            photo: "@image('150x150', '#ffcc33', '#FFF', 'png', 'hehe')",
            "userTypeId|1-3": 0
        }
    ]
})

const {User} = require("./../models");
require("./../models/relation");
User.bulkCreate(result.datas)
