import { DataTypes } from "sequelize";
import db from "../database/connection";

const Inseminacion = db.define('tbl_inseminacion', {
    ins_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ins_fechainseminacion: {
        type: DataTypes.DATE,
    },
    per_id: {
        type: DataTypes.INTEGER,
    },
    ani_id: {
        type: DataTypes.INTEGER,
    },
    ins_fechacomprobacion: {
        type: DataTypes.DATE
    },
    ins_cargada: {
        type: DataTypes.STRING
    },
    ins_tipoinseminacion: {
        type: DataTypes.STRING
    },
    ani_idpadre: {
        type: DataTypes.INTEGER
    },
    ins_numpajuela: {
        type: DataTypes.STRING
    },
    ins_descripcion: {
        type: DataTypes.STRING,
    },
    ins_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Inseminacion;