"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Tratamiento = connection_1.default.define('tbl_tratamiento', {
    tra_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tra_fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tra_diagnostico: {
        type: sequelize_1.DataTypes.STRING
    },
    tra_medicamento: {
        type: sequelize_1.DataTypes.STRING
    },
    tra_diastratamiento: {
        type: sequelize_1.DataTypes.STRING
    },
    tra_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    tra_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Tratamiento;
//# sourceMappingURL=tbl_tratamiento.js.map