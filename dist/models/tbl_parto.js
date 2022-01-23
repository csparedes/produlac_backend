"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Parto = connection_1.default.define('tbl_parto', {
    par_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    par_fecha: {
        type: sequelize_1.DataTypes.STRING
    },
    ani_idmadre: {
        type: sequelize_1.DataTypes.STRING
    },
    ani_idhijo: {
        type: sequelize_1.DataTypes.STRING
    },
    par_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    par_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Parto;
//# sourceMappingURL=tbl_parto.js.map