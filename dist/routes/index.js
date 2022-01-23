"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const personas_1 = __importDefault(require("./personas"));
const animales_1 = __importDefault(require("./animales"));
const catalogo_1 = __importDefault(require("./catalogo"));
const deceso_1 = __importDefault(require("./deceso"));
const finca_1 = __importDefault(require("./finca"));
const login_1 = __importDefault(require("./login"));
const finca_persona_1 = __importDefault(require("./finca_persona"));
const ingreso_egreso_1 = __importDefault(require("./ingreso_egreso"));
const inseminacion_1 = __importDefault(require("./inseminacion"));
const item_1 = __importDefault(require("./item"));
const menu_1 = __importDefault(require("./menu"));
const parto_aborto_1 = __importDefault(require("./parto_aborto"));
const prod_global_1 = __importDefault(require("./prod_global"));
const prod_individuales_1 = __importDefault(require("./prod_individuales"));
const rol_1 = __importDefault(require("./rol"));
const sub_menu_1 = __importDefault(require("./sub_menu"));
const tratamientos_1 = __importDefault(require("./tratamientos"));
const vacuna_1 = __importDefault(require("./vacuna"));
const venta_1 = __importDefault(require("./venta"));
const especies_1 = __importDefault(require("./especies"));
const parto_1 = __importDefault(require("./parto"));
const aborto_1 = __importDefault(require("./aborto"));
exports.default = {
    rutasPersonas: personas_1.default,
    rutasAnimales: animales_1.default,
    rutasCatalogos: catalogo_1.default,
    rutasDecesos: deceso_1.default,
    rutasFincas: finca_1.default,
    rutasLogin: login_1.default,
    rutasFincaPersona: finca_persona_1.default,
    rutasIngresoEgreso: ingreso_egreso_1.default,
    rutasInseminacion: inseminacion_1.default,
    rutasItems: item_1.default,
    rutasMenus: menu_1.default,
    rutasPartoAborto: parto_aborto_1.default,
    rutasProdGlobal: prod_global_1.default,
    rutasProdIndividual: prod_individuales_1.default,
    rutasRol: rol_1.default,
    rutasSubMenu: sub_menu_1.default,
    rutasTratamiento: tratamientos_1.default,
    rutasVacuna: vacuna_1.default,
    rutasVenta: venta_1.default,
    rutasEspecies: especies_1.default,
    rutasParto: parto_1.default,
    rutasAborto: aborto_1.default,
};
//# sourceMappingURL=index.js.map