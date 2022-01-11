"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Persona = connection_1.default.define('tbl_personas', {
    per_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    per_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_usuario: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    per_contraseña: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_cedula: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    per_correo: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    per_direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    per_estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.default = Persona;
//# sourceMappingURL=tbl_personas.js.map