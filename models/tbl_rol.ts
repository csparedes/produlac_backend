import { DataTypes } from "sequelize";
import db from "../database/connection";

const Rol = db.define('tbl_rol', {
    rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol_nombre: {
        type: DataTypes.STRING,
    },
    rol_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Rol;