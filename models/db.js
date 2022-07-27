const dbConfig = require("./../config/db.json");
const {Sequelize} = require("sequelize");
const logger = require("./../utils/logger")

const sequelize = new Sequelize(
    dbConfig.recruitment.database,
    dbConfig.recruitment.user,
    dbConfig.recruitment.password,
    {
        host: dbConfig.recruitment.host,
        dialect: dbConfig.recruitment.dialect,
        logging: (msg) => {
            logger.sqlLogger.debug(msg)
        }
    }
)

sequelize.authenticate().then( () => {
} ).catch(reason => {
    console.log(reason)
})

module.exports = sequelize;
