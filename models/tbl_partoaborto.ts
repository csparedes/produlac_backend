import { DataTypes } from "sequelize";
import db from "../database/connection";

const PartoAborto = db.define('tbl_partoaborto', {
    par_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    par_fecha: {
        type: DataTypes.DATE,
    },
    ani_idmadre: {
        type: DataTypes.INTEGER
    },
    ani_idhijo: {
        type: DataTypes.INTEGER
    },
    ite_idpartoaborto: {
        type: DataTypes.INTEGER
    },
    par_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default PartoAborto;