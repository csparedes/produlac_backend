import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Aborto = db.define('tbl_aborto', {
    abo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    abo_fecha: {
        type: DataTypes.STRING
    },
    ani_idmadre: {
        type: DataTypes.STRING
    },
    abo_descripcion: {
        type: DataTypes.STRING
    },
    abo_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

export default Aborto;