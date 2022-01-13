"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ProdGlobal = connection_1.default.define('tbl_prodglobal', {
    pglo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pglo_fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    pglo_horario: {
        type: sequelize_1.DataTypes.STRING
    },
    pglo_litros: {
        type: sequelize_1.DataTypes.STRING
    },
    pglo_numvacas: {
        type: sequelize_1.DataTypes.STRING
    },
    fin_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    pglo_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = ProdGlobal;
//# sourceMappingURL=tbl_prodglobal.js.map