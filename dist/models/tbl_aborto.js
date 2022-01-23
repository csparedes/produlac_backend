"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Aborto = connection_1.default.define('tbl_aborto', {
    abo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abo_fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    ani_idmadre: {
        type: sequelize_1.DataTypes.STRING
    },
    abo_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    abo_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});
exports.default = Aborto;
//# sourceMappingURL=tbl_aborto.js.map