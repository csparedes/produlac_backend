import { DataTypes } from "sequelize";
import db from "../database/connection";

const ProdGlobal = db.define('tbl_prodglobal', {
    pglo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pglo_fecha: {
        type: DataTypes.DATE
    },
    ite_idhorario: {
        type: DataTypes.INTEGER
    },
    pglo_litros: {
        type: DataTypes.STRING
    },
    pglo_numvacas: {
        type: DataTypes.STRING
    },
    fin_id: {
        type: DataTypes.INTEGER
    },
    pglo_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default ProdGlobal;