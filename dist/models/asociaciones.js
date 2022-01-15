"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_animales_1 = __importDefault(require("./tbl_animales"));
const tbl_catalogo_1 = __importDefault(require("./tbl_catalogo"));
const tbl_finca_1 = __importDefault(require("./tbl_finca"));
const tbl_fincapersona_1 = __importDefault(require("./tbl_fincapersona"));
const tbl_item_1 = __importDefault(require("./tbl_item"));
const tbl_personas_1 = __importDefault(require("./tbl_personas"));
const tbl_rol_1 = __importDefault(require("./tbl_rol"));
//Asociación de Persona y rol
//* Una persona tiene un rol
tbl_rol_1.default.hasOne(tbl_personas_1.default, { as: "rol", foreignKey: "rol_id" });
tbl_personas_1.default.belongsTo(tbl_rol_1.default, { foreignKey: "rol_id" });
// * Una persona tiene una finca
tbl_personas_1.default.hasOne(tbl_finca_1.default, { as: "persona", foreignKey: "per_id" });
tbl_finca_1.default.belongsTo(tbl_personas_1.default, { foreignKey: "per_id" });
//* Una persona tiene varias fincas
tbl_fincapersona_1.default.hasOne(tbl_personas_1.default, { foreignKey: "per_id" });
tbl_personas_1.default.belongsTo(tbl_fincapersona_1.default, { foreignKey: "per_id" });
tbl_fincapersona_1.default.hasOne(tbl_finca_1.default, { foreignKey: "fin_id" });
tbl_finca_1.default.belongsTo(tbl_fincapersona_1.default, { foreignKey: "fin_id" });
// * Un animal pertenece a una finca
tbl_animales_1.default.hasOne(tbl_finca_1.default, { foreignKey: "fin_id" });
tbl_finca_1.default.belongsTo(tbl_animales_1.default, { foreignKey: "fin_id" });
// * Un animal tiene un estado
tbl_animales_1.default.hasOne(tbl_item_1.default, { foreignKey: "ite_id" });
tbl_item_1.default.belongsTo(tbl_animales_1.default, { foreignKey: "ite_id" });
// * Un catalogo puede tener varios items
tbl_item_1.default.hasOne(tbl_catalogo_1.default, { foreignKey: "cat_id" });
tbl_catalogo_1.default.belongsTo(tbl_item_1.default, { foreignKey: "cat_id" });
//# sourceMappingURL=asociaciones.js.map