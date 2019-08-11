const mysql = require("mysql");
const mysqlConfig = require("../../config.js");

module.exports = mysql.createConnection(mysqlConfig);
