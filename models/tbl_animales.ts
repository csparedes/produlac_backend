import { DataTypes } from "sequelize";
import db from "../database/connection";

const Animales = db.define("tbl_animales", {
    ani_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ani_codigo: {
        type: DataTypes.STRING,
    },
    ani_nombre: {
        type: DataTypes.STRING,
    },
    ani_sexo: {
        type: DataTypes.STRING,
    },
    ani_fechanacimiento: {
        type: DataTypes.DATE,
    },
    ani_imagen: {
        type: DataTypes.STRING,
    },
    ani_raza: {
        type: DataTypes.STRING,
    },
    ite_idetapa: {
        type: DataTypes.STRING,
    },
    ani_idpadre: {
        type: DataTypes.INTEGER,
    },
    ani_idmadre: {
        type: DataTypes.INTEGER,
    },
    ani_pesonacer: {
        type: DataTypes.STRING,
    },
    ite_idespecie: {
        type: DataTypes.INTEGER,
    },
    fin_id: {
        type: DataTypes.INTEGER,
    },
    ite_idtipoestado: {
        type: DataTypes.BOOLEAN
    },
    ani_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
},
{
    freezeTableName: true,
    timestamps: false
    });

export default Animales;