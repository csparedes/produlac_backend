import express, { Application } from "express";
import cors from "cors";

import rutasPersonas from '../routes/personas';
import rutasAnimales from '../routes/animales';
import rutasCatalogos from '../routes/catalogo';
import rutasDecesos from '../routes/deceso';
import rutasFincas from '../routes/finca';
import rutasLogin from '../routes/login';
class Server{
    private app: Application;
    private port: string;
    private server: any;
    private apiPaths = {
        personas: '/api/personas',
        animales: '/api/animales',
        catalogos: '/api/catalogos',
        decesos: '/api/decesos',
        fincas: '/api/fincas',
        login: '/api/login',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.server = require("http").createServer(this.app);

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.apiPaths.personas, rutasPersonas);
        this.app.use(this.apiPaths.animales, rutasAnimales);
        this.app.use(this.apiPaths.catalogos, rutasCatalogos);
        this.app.use(this.apiPaths.decesos, rutasDecesos);
        this.app.use(this.apiPaths.fincas, rutasFincas);
        this.app.use(this.apiPaths.login, rutasLogin);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
            
        });
    }
}


export default Server;
