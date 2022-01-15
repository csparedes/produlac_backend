"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Inseminacion = connection_1.default.define('tbl_inseminacion', {
    ins_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ins_fechainseminacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    per_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ins_fechacomprobacion: {
        type: sequelize_1.DataTypes.DATE
    },
    ins_cargada: {
        type: sequelize_1.DataTypes.STRING
    },
    ins_tipoinseminacion: {
        type: sequelize_1.DataTypes.STRING
    },
    ani_idpadre: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ins_numpajuela: {
        type: sequelize_1.DataTypes.STRING
    },
    ins_descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    ins_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Inseminacion;
//# sourceMappingURL=tbl_inseminacion.js.map