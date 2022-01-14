"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tbl_personas_1 = __importDefault(require("./tbl_personas"));
const tbl_rol_1 = __importDefault(require("./tbl_rol"));
//Asociación de Persona y rol
//* Una persona tiene un rol
tbl_rol_1.default.hasOne(tbl_personas_1.default, { as: "rol", foreignKey: "rol_id" });
tbl_personas_1.default.belongsTo(tbl_rol_1.default, { foreignKey: "rol_id" });
//* Una persona tiene varias fincas
// FincaPersona.belongsTo(Persona);
// Persona.hasOne(FincaPersona);
// Finca.belongsTo(FincaPersona);
// FincaPersona.hasOne(Finca);
//# sourceMappingURL=asociaciones.js.map