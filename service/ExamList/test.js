const ser = require("./");
ser.getExamByPage(1, 10).then(data => {
    console.log(data)
})
