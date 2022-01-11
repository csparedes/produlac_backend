"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Animales = connection_1.default.define("tbl_animales", {
    ani_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ani_codigo: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_sexo: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_fechanacimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    ani_imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_raza: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_etapa: {
        type: sequelize_1.DataTypes.STRING,
    },
    ani_idpadre: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ani_idmadre: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ani_peso_nacer: {
        type: sequelize_1.DataTypes.STRING,
    },
    ite_idespecieanimal: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fin_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ite_idtipoestado: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ani_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Animales;
//# sourceMappingURL=tbl_animales.js.map