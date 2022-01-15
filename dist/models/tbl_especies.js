"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Especie = connection_1.default.define('tbl_especies', {
    esp_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    esp_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    cat_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    esp_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Especie;
//# sourceMappingURL=tbl_especies.js.map