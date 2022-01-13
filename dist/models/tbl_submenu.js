"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const SubMenu = connection_1.default.define('tbl_submenu', {
    smen_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    smen_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    smen_link: {
        type: sequelize_1.DataTypes.STRING,
    },
    men_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    smen_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = SubMenu;
//# sourceMappingURL=tbl_submenu.js.map