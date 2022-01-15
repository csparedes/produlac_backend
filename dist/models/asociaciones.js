"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_animales_1 = __importDefault(require("./tbl_animales"));
const tbl_catalogo_1 = __importDefault(require("./tbl_catalogo"));
const tbl_deceso_1 = __importDefault(require("./tbl_deceso"));
const tbl_especies_1 = __importDefault(require("./tbl_especies"));
const tbl_finca_1 = __importDefault(require("./tbl_finca"));
const tbl_fincapersona_1 = __importDefault(require("./tbl_fincapersona"));
const tbl_ingresoegreso_1 = __importDefault(require("./tbl_ingresoegreso"));
const tbl_inseminacion_1 = __importDefault(require("./tbl_inseminacion"));
const tbl_item_1 = __importDefault(require("./tbl_item"));
const tbl_menu_1 = __importDefault(require("./tbl_menu"));
const tbl_partoaborto_1 = __importDefault(require("./tbl_partoaborto"));
const tbl_personas_1 = __importDefault(require("./tbl_personas"));
const tbl_prodglobal_1 = __importDefault(require("./tbl_prodglobal"));
const tbl_prodindividual_1 = __importDefault(require("./tbl_prodindividual"));
const tbl_rol_1 = __importDefault(require("./tbl_rol"));
const tbl_submenu_1 = __importDefault(require("./tbl_submenu"));
const tbl_tratamiento_1 = __importDefault(require("./tbl_tratamiento"));
const tbl_vacuna_1 = __importDefault(require("./tbl_vacuna"));
const tbl_venta_1 = __importDefault(require("./tbl_venta"));
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
// * Un animal tiene una especie
tbl_animales_1.default.hasOne(tbl_especies_1.default, { foreignKey: "esp_id" });
tbl_especies_1.default.belongsTo(tbl_animales_1.default, { foreignKey: "esp_id" });
// * Un catalogo puede tener varios items
tbl_item_1.default.hasOne(tbl_catalogo_1.default, { foreignKey: "cat_id" });
tbl_catalogo_1.default.belongsTo(tbl_item_1.default, { foreignKey: "cat_id" });
// * Una especie tiene un catalogo
tbl_especies_1.default.hasOne(tbl_catalogo_1.default, { foreignKey: "cat_id" });
tbl_catalogo_1.default.belongsTo(tbl_especies_1.default, { foreignKey: "cat_id" });
// * Un parto/aborto tiene varios animales
// PartoAborto.hasMany(Animales, { foreignKey: "ani_id", sourceKey: "ani_idmadre" });
// PartoAborto.hasMany(Animales, { foreignKey: "ani_id", sourceKey: "ani_idhijo" });
// Animales.belongsTo(PartoAborto, { foreignKey: "ani_id", targetKey: "ani_idmadre" });
// Animales.belongsTo(PartoAborto, { foreignKey: "ani_id", targetKey: "ani_idhijo" });
// * Un parto/aborto tiene un item
tbl_partoaborto_1.default.hasOne(tbl_item_1.default, { foreignKey: "ite_id", sourceKey: "ite_idpartoaborto" });
tbl_item_1.default.belongsTo(tbl_partoaborto_1.default, { foreignKey: "ite_id" });
// * Una inseminación tiene una persona
tbl_inseminacion_1.default.hasOne(tbl_personas_1.default, { foreignKey: "per_id" });
tbl_personas_1.default.belongsTo(tbl_inseminacion_1.default, { foreignKey: "per_id" });
// * Una inseminación tiene un animal
tbl_inseminacion_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.belongsTo(tbl_inseminacion_1.default, { foreignKey: "ani_id" });
// * Un deceso tiene un animal
tbl_deceso_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.belongsTo(tbl_deceso_1.default, { foreignKey: "ani_id" });
// * Una venta tiene un animal
tbl_venta_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.belongsTo(tbl_venta_1.default, { foreignKey: "ani_id" });
// * Una venta tiene un vendedor(persona)
tbl_venta_1.default.hasOne(tbl_personas_1.default, { foreignKey: "per_id", sourceKey: "per_idvendedor" });
tbl_personas_1.default.belongsTo(tbl_venta_1.default, { foreignKey: "per_id", targetKey: "per_idvendedor" });
// * Un tratamiento tiene un animal
tbl_tratamiento_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.hasOne(tbl_tratamiento_1.default, { foreignKey: "ani_id" });
// * Una vacuna tiene un animal
tbl_vacuna_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.belongsTo(tbl_vacuna_1.default, { foreignKey: "ani_id" });
// * Producción individual tiene un animal
tbl_prodindividual_1.default.hasOne(tbl_animales_1.default, { foreignKey: "ani_id" });
tbl_animales_1.default.belongsTo(tbl_prodindividual_1.default, { foreignKey: "ani_id" });
// * Producción global tiene una finca
tbl_prodglobal_1.default.hasOne(tbl_finca_1.default, { foreignKey: "fin_id" });
tbl_finca_1.default.belongsTo(tbl_prodglobal_1.default, { foreignKey: "fin_id" });
// * IngresoEgreso tiene una finca
tbl_ingresoegreso_1.default.hasOne(tbl_finca_1.default, { foreignKey: "fin_id" });
tbl_finca_1.default.belongsTo(tbl_ingresoegreso_1.default, { foreignKey: "fin_id" });
// * IngresoEgreso tiene un item
tbl_ingresoegreso_1.default.hasOne(tbl_item_1.default, { foreignKey: "ite_id", sourceKey: "ite_idingresoegreso" });
tbl_item_1.default.belongsTo(tbl_ingresoegreso_1.default, { foreignKey: "ite_id", targetKey: "ite_idingresoegreso" });
// * Un menú muestra un rol
tbl_menu_1.default.hasOne(tbl_rol_1.default, { foreignKey: "rol_id" });
tbl_rol_1.default.belongsTo(tbl_menu_1.default, { foreignKey: "rol_id" });
// * Un submenu muestra un menu
tbl_submenu_1.default.hasOne(tbl_menu_1.default, { foreignKey: "men_id" });
tbl_menu_1.default.belongsTo(tbl_submenu_1.default, { foreignKey: "men_id" });
//# sourceMappingURL=asociaciones.js.map