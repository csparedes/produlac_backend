import { DataTypes } from "sequelize";
import db from "../database/connection";

const Parto = db.define('tbl_parto', {
    par_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    par_fecha: {
        type: DataTypes.STRING
    },
    ani_idmadre: {
        type: DataTypes.STRING
    },
    ani_idhijo: {
        type: DataTypes.STRING
    },
    par_descripcion: {
        type: DataTypes.STRING
    },
    par_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Parto;