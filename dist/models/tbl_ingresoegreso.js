"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const IngresoEgreso = connection_1.default.define('tbl_ingresoegreso', {
    ing_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ing_monto: {
        type: sequelize_1.DataTypes.STRING
    },
    ite_idingresoegreso: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fin_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ing_descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    ing_fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    ing_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = IngresoEgreso;
//# sourceMappingURL=tbl_ingresoegreso.js.map