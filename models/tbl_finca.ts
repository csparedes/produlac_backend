import { DataTypes } from "sequelize";
import db from "../database/connection";

const Finca = db.define('tbl_finca', {
    fin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fin_nombre: {
        type: DataTypes.STRING,
    },
    fin_extension: {
        type: DataTypes.STRING,
    },
    fin_imagen: {
        type: DataTypes.STRING,
    },
    fin_pais: {
        type: DataTypes.STRING,
    },
    fin_provincia: {
        type: DataTypes.STRING,
    },
    fin_ciudad: {
        type: DataTypes.STRING,
    },
    fin_telefono: {
        type: DataTypes.STRING,
    },
    per_id: {
        type: DataTypes.INTEGER,
    },
    fin_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Finca;