import { DataTypes } from "sequelize";
import db from "../database/connection";

const ProdIndividual = db.define('tbl_prodindividual', {
    pro_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ani_id: {
        type: DataTypes.INTEGER
    },
    pro_fecha: {
        type: DataTypes.DATE
    },
    pro_litros: {
        type: DataTypes.INTEGER
    },
    pro_dieta: {
        type: DataTypes.STRING
    },
    ite_idhorario: {
        type: DataTypes.INTEGER
    },
    pro_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default ProdIndividual;