"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const personas_1 = __importDefault(require("../routes/personas"));
const animales_1 = __importDefault(require("../routes/animales"));
const catalogo_1 = __importDefault(require("../routes/catalogo"));
const deceso_1 = __importDefault(require("../routes/deceso"));
const finca_1 = __importDefault(require("../routes/finca"));
const login_1 = __importDefault(require("../routes/login"));
const finca_persona_1 = __importDefault(require("../routes/finca_persona"));
const ingreso_egreso_1 = __importDefault(require("../routes/ingreso_egreso"));
const inseminacion_1 = __importDefault(require("../routes/inseminacion"));
const item_1 = __importDefault(require("../routes/item"));
const menu_1 = __importDefault(require("../routes/menu"));
const prod_global_1 = __importDefault(require("../routes/prod_global"));
const prod_individuales_1 = __importDefault(require("../routes/prod_individuales"));
const rol_1 = __importDefault(require("../routes/rol"));
const sub_menu_1 = __importDefault(require("../routes/sub_menu"));
const tratamientos_1 = __importDefault(require("../routes/tratamientos"));
const vacuna_1 = __importDefault(require("../routes/vacuna"));
const venta_1 = __importDefault(require("../routes/venta"));
const especies_1 = __importDefault(require("../routes/especies"));
const parto_1 = __importDefault(require("../routes/parto"));
const aborto_1 = __importDefault(require("../routes/aborto"));
class Server {
    constructor() {
        this.apiPaths = {
            personas: '/api/personas',
            animales: '/api/animales',
            catalogos: '/api/catalogos',
            decesos: '/api/decesos',
            fincas: '/api/fincas',
            login: '/api/login',
            fincaPersona: '/api/fincaPersona',
            ingresoEgreso: '/api/ingresosEgresos',
            inseminacion: '/api/inseminacion',
            items: '/api/items',
            menu: '/api/menu',
            partoAborto: '/api/partoAborto',
            prodGlobal: '/api/prodGlobal',
            prodIndividual: '/api/prodIndividual',
            rol: '/api/rol',
            subMenu: '/api/subMenu',
            tratamientos: '/api/tratamientos',
            vacunas: '/api/vacunas',
            ventas: '/api/ventas',
            especies: '/api/especies',
            parto: '/api/parto',
            aborto: '/api/aborto'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || "3000";
        this.server = require("http").createServer(this.app);
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.personas, personas_1.default);
        this.app.use(this.apiPaths.animales, animales_1.default);
        this.app.use(this.apiPaths.catalogos, catalogo_1.default);
        this.app.use(this.apiPaths.decesos, deceso_1.default);
        this.app.use(this.apiPaths.fincas, finca_1.default);
        this.app.use(this.apiPaths.login, login_1.default);
        this.app.use(this.apiPaths.fincaPersona, finca_persona_1.default);
        this.app.use(this.apiPaths.ingresoEgreso, ingreso_egreso_1.default);
        this.app.use(this.apiPaths.inseminacion, inseminacion_1.default);
        this.app.use(this.apiPaths.items, item_1.default);
        this.app.use(this.apiPaths.menu, menu_1.default);
        this.app.use(this.apiPaths.prodGlobal, prod_global_1.default);
        this.app.use(this.apiPaths.prodIndividual, prod_individuales_1.default);
        this.app.use(this.apiPaths.rol, rol_1.default);
        this.app.use(this.apiPaths.subMenu, sub_menu_1.default);
        this.app.use(this.apiPaths.tratamientos, tratamientos_1.default);
        this.app.use(this.apiPaths.vacunas, vacuna_1.default);
        this.app.use(this.apiPaths.ventas, venta_1.default);
        this.app.use(this.apiPaths.especies, especies_1.default);
        this.app.use(this.apiPaths.parto, parto_1.default);
        this.app.use(this.apiPaths.aborto, aborto_1.default);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map