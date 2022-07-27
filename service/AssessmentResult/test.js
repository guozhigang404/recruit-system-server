const serve = require("./index");

serve.getAssessmentResultsByExamsId(1).then(data => {
    console.log(data)
})
