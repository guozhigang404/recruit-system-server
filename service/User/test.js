const userService = require("./index");

// userService.updateUser(1, {
//     name: "知趣",
//     birth: "1998-06-03"
// }).then(result => {
//     console.log(result)
// }).catch(reason => {
//     console.log(reason)
// })

/*userService.getUserByTel("15076693529").then(data => {
    console.log(data)
})*/

userService.addUser({
    loginPwd: "123456",
    name: "大黄02",
    email: "26417489264@qq.com",
    tel: "10200001114",
    sex: false,
    birth: "2022-3-22 18:00:00",
    address: "河北省河间市",
    major: "计算机",
    university: "沧州师范学院",
    qualifications: "本科",
    userTypeId: 1
}).then(result => {
    console.log(result);
}).catch(err => {
    console.log(err.message)
})


// userService.login("2641748926@qq.com", "12456").then(result => {
//     console.log(result)
// }).catch(reason => {
//     console.log(reason)
// })

