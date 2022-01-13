"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Venta = connection_1.default.define('tbl_venta', {
    ven_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ven_fecha: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_idvendedor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ven_comprador: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_telcomprador: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_cedulacomprador: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_direccioncomprador: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_valor: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Venta;
//# sourceMappingURL=tbl_venta.js.map