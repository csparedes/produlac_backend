import { DataTypes } from "sequelize";
import db from "../database/connection";

const Especie = db.define('tbl_especies', {
    esp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    esp_nombre: {
        type: DataTypes.STRING
    },
    cat_id: {
        type: DataTypes.INTEGER
    },
    esp_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Especie;