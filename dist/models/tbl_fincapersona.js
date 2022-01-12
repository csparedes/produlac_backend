"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const FincaPersona = connection_1.default.define('tbl_fincapersona', {
    fper_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    per_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fin_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fper_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = FincaPersona;
//# sourceMappingURL=tbl_fincapersona.js.map