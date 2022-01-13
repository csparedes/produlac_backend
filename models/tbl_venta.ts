import { DataTypes } from "sequelize";
import db from "../database/connection";

const Venta = db.define('tbl_venta', {
    ven_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ani_id: {
        type: DataTypes.INTEGER,
    },
    ven_fecha: {
        type: DataTypes.STRING,
    },
    per_idvendedor: {
        type: DataTypes.INTEGER,
    },
    ven_comprador: {
        type: DataTypes.STRING
    },
    ven_telcomprador: {
        type: DataTypes.STRING
    },
    ven_cedulacomprador: {
        type: DataTypes.STRING
    },
    ven_direccioncomprador: {
        type: DataTypes.STRING
    },
    ven_valor: {
        type: DataTypes.STRING
    },
    ven_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Venta;