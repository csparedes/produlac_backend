import { DataTypes } from "sequelize";
import db from "../database/connection";

const Vacuna = db.define('tbl_vacuna', {
    vac_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    vac_fecha: {
        type: DataTypes.DATE,
    },
    ani_id: {
        type: DataTypes.INTEGER
    },
    vac_vacuna: {
        type: DataTypes.STRING,
    },
    vac_enfermedad: {
        type: DataTypes.STRING
    },
    vac_descripcion: {
        type: DataTypes.STRING
    },
    vac_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Vacuna;