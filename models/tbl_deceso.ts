import { DataTypes } from "sequelize";
import db from "../database/connection";

const Deceso = db.define('tbl_deceso', {
    dec_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ani_id: {
        type: DataTypes.INTEGER,
    },
    dec_fecha: {
        type: DataTypes.DATE,
    },
    dec_causa: {
        type: DataTypes.STRING,
    },
    dec_descripcion: {
        type: DataTypes.STRING,
    },
    dec_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Deceso;