"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Item = connection_1.default.define('tbl_item', {
    ite_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ite_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    cat_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ite_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Item;
//# sourceMappingURL=tbl_item.js.map