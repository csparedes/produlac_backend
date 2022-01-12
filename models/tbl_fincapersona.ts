import { DataTypes } from "sequelize";
import db from "../database/connection";

const FincaPersona = db.define('tbl_fincapersona', {
    fper_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    per_id: {
        type: DataTypes.INTEGER,
    },
    fin_id: {
        type: DataTypes.INTEGER,
    },
    fper_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default FincaPersona;