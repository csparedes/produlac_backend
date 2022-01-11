"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
//@ts-ignore
const db = new sequelize_1.Sequelize(process.env.CONN_BDD, process.env.CONN_USER, process.env.CONN_PASS, {
    host: process.env.CONN_HOST,
    dialect: "mysql",
    logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map