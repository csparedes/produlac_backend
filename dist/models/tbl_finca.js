"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Finca = connection_1.default.define('tbl_finca', {
    fin_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fin_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_extension: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_pais: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_provincia: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_ciudad: {
        type: sequelize_1.DataTypes.STRING,
    },
    fin_telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fin_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Finca;
//# sourceMappingURL=tbl_finca.js.map