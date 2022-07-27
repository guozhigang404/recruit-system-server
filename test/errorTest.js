const ErrorHandle =  require("./../utils/error-handler");

try {
    throw ErrorHandle.createErrorIns(ErrorHandle.errorNames.unknownError, "美好的生活");
} catch (err) {
    console.log(err.name);
    console.log(err.message);
}
