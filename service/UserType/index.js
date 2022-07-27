const {UserType} = require("./../../models");

async function add(data) {
    if (!data.name) {
        throw new Error("name 为空")
    }
    const result = await UserType.create(data);
    return result.toJSON();
}

async function getAll() {
    const result = await UserType.findAndCountAll({
        attributes: ["id", "name", "createdAt"],
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

async function update(id, data) {
    const result = await UserType.update(data, {
        where: {
            id
        }
    });
    return result[0]
}

async function deleteUserType(id) {
    return await UserType.destroy({
        where: {
            id
        }
    });
}

module.exports = {
    add,
    getAll,
    update,
    deleteUserType
}
