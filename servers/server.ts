import express, { Application } from "express";
import cors from "cors";

import rutasPersonas from '../routes/personas';
import rutasAnimales from '../routes/animales';
import rutasCatalogos from '../routes/catalogo';
class Server{
    private app: Application;
    private port: string;
    private server: any;
    private apiPaths = {
        personas: '/api/personas',
        animales: '/api/animales',
        catalogos: '/api/catalogos'
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
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
            
        });
    }
}


export default Server;
