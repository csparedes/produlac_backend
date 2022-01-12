import { DataTypes } from "sequelize";
import db from "../database/connection";

const Menu = db.define('tbl_menu', {
    men_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    men_nombre: {
        type: DataTypes.STRING,
    },
    men_icono: {
        type: DataTypes.STRING,
    },
    rol_id: {
        type: DataTypes.INTEGER,
    },
    men_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Menu;