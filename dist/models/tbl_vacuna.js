"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Vacuna = connection_1.default.define('tbl_vacuna', {
    vac_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vac_fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    vac_vacuna: {
        type: sequelize_1.DataTypes.STRING,
    },
    vac_enfermedad: {
        type: sequelize_1.DataTypes.STRING
    },
    vac_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    vac_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Vacuna;
//# sourceMappingURL=tbl_vacuna.js.map