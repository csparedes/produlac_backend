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
    pro_horario: {
        type: DataTypes.STRING
    },
    pro_litros: {
        type: DataTypes.INTEGER
    },
    pro_dieta: {
        type: DataTypes.STRING
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