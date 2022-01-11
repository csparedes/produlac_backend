"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const personas_1 = __importDefault(require("../routes/personas"));
class Server {
    constructor() {
        this.apiPaths = {
            personas: '/api/personas'
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
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map