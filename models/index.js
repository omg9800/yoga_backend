const Sequelize = require("sequelize");
const sequelize = require('../config/connection')

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.batches = require("./batch")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.enrolments=require("./enrolment")(sequelize, Sequelize);

db.batches.belongsToMany(db.users, { through: "enrolments" });
db.users.belongsToMany(db.batches, { through: "enrolments" });

module.exports = db;