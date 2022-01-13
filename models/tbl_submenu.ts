import { DataTypes } from "sequelize";
import db from "../database/connection";
const SubMenu = db.define('tbl_submenu', {
    smen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    smen_nombre: {
        type: DataTypes.STRING,
    },
    smen_link: {
        type: DataTypes.STRING,
    },
    men_id: {
        type: DataTypes.INTEGER
    },
    smen_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
});
export default SubMenu;