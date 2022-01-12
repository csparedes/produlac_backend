import { DataTypes } from "sequelize";
import db from "../database/connection";

const Item = db.define('tbl_item', {
    ite_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ite_nombre: {
        type: DataTypes.STRING,
    },
    cat_id: {
        type: DataTypes.INTEGER,
    },
    ite_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Item;