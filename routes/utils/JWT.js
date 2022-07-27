const key = "5C40971AD37E3A9F55F0F563882A27F8";
const jwt = require("jsonwebtoken");

// 颁发jwt
function publish(response, data = {}, maxAge = 3600 * 24,) {
    const token = jwt.sign(data, key, {
        expiresIn: maxAge
    });
    response.header("authorization", token)
}

/**
 * 验证和解析token
 * @param request Http Request对象
 * @returns {null|*} 如果token失效，返回null，否则返回用户id
 */
function verify(request) {
    let token = request.headers["authorization"];
    if (!token) {
        return null;
    }
    // authorization: bearer token
    token = token.split(" ");
    token = token.length === 1 ? token[0] : token[1];
    try {
        return jwt.verify(token, key);
    } catch (err) {
        return null;
    }
}

module.exports = {
    publish,
    verify
}
