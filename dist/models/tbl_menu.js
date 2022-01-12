"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Menu = connection_1.default.define('tbl_menu', {
    men_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    men_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    men_icono: {
        type: sequelize_1.DataTypes.STRING,
    },
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    men_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Menu;
//# sourceMappingURL=tbl_menu.js.map