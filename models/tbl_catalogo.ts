import { DataTypes } from "sequelize";
import db from "../database/connection";

const Catalogo = db.define('tbl_catalogo', {
    cat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_nombre: {
        type: DataTypes.STRING,
    },
    cat_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Catalogo;