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
class Server {
    constructor() {
        this.apiPaths = {
            personas: '/api/personas',
            animales: '/api/animales',
            catalogos: '/api/catalogos',
            decesos: '/api/decesos',
            fincas: '/api/fincas',
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
    }
    routes() {
        this.app.use(this.apiPaths.personas, personas_1.default);
        this.app.use(this.apiPaths.animales, animales_1.default);
        this.app.use(this.apiPaths.catalogos, catalogo_1.default);
        this.app.use(this.apiPaths.decesos, deceso_1.default);
        this.app.use(this.apiPaths.fincas, finca_1.default);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map