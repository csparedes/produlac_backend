import { DataTypes } from "sequelize";
import db from "../database/connection";

const Tratamiento = db.define('tbl_tratamiento', {
    tra_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tra_fecha: {
        type: DataTypes.DATE
    },
    ani_id: {
        type: DataTypes.INTEGER
    },
    tra_diagnostico: {
        type: DataTypes.STRING
    },
    tra_medicamento: {
        type: DataTypes.STRING
    },
    tra_diastratamiento: {
        type: DataTypes.STRING
    },
    tra_descripcion: {
        type: DataTypes.STRING
    },
    tra_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Tratamiento;