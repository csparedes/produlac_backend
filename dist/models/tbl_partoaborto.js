"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const PartoAborto = connection_1.default.define('tbl_partoaborto', {
    par_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    par_fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    ani_idmadre: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ani_idhijo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ite_idpartoaborto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    par_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = PartoAborto;
//# sourceMappingURL=tbl_partoaborto.js.map