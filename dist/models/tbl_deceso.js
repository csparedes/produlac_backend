"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Deceso = connection_1.default.define('tbl_deceso', {
    dec_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dec_fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    dec_causa: {
        type: sequelize_1.DataTypes.STRING,
    },
    dec_descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    dec_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Deceso;
//# sourceMappingURL=tbl_deceso.js.map