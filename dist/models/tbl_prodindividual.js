"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ProdIndividual = connection_1.default.define('tbl_prodindividual', {
    pro_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    pro_fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    pro_horario: {
        type: sequelize_1.DataTypes.STRING
    },
    pro_litros: {
        type: sequelize_1.DataTypes.STRING
    },
    pro_dieta: {
        type: sequelize_1.DataTypes.STRING
    },
    pro_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = ProdIndividual;
//# sourceMappingURL=tbl_prodindividual.js.map