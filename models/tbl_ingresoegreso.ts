import { DataTypes } from "sequelize";
import db from "../database/connection";

const IngresoEgreso = db.define('tbl_ingresoegreso', {
    ing_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ing_monto: {
        type: DataTypes.STRING
    },
    ite_idingresoegreso: {
        type: DataTypes.INTEGER
    },
    fin_id: {
        type: DataTypes.INTEGER,
    },
    ing_descripcion: {
        type: DataTypes.STRING,
    },
    ing_fecha: {
        type: DataTypes.DATE,
    },
    ing_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default IngresoEgreso;