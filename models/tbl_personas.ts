import { DataTypes } from "sequelize";
import db from '../database/connection';
const Persona = db.define('tbl_personas',
    {
    per_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    per_nombre: {
        type: DataTypes.STRING,
    },
    per_apellido: {
        type: DataTypes.STRING,
    },
    per_usuario: {
        type: DataTypes.STRING,
        unique: true
    },
    per_contraseña: {
        type: DataTypes.STRING,
    },
    per_imagen: {
        type: DataTypes.STRING,
    },
    per_cedula: {
        type: DataTypes.STRING,
        unique: true
    },
    per_correo: {
        type: DataTypes.STRING,
        },
    per_telefono: {
        type: DataTypes.STRING,    
    },
    per_direccion: {
        type: DataTypes.STRING,
    },
    rol_id: {
        type: DataTypes.INTEGER,
    },
    per_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    },
    {
    freezeTableName: true,
    timestamps: false,
    },
);

export default Persona;