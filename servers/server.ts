import express, { Application } from "express";
import cors from "cors";

import rutasPersonas from '../routes/personas';
import rutasAnimales from '../routes/animales';
import rutasCatalogos from '../routes/catalogo';
import rutasDecesos from '../routes/deceso';
import rutasFincas from '../routes/finca';
import rutasLogin from '../routes/login';
import rutasFincaPersona from '../routes/finca_persona';
import rutasIngresoEgreso from '../routes/ingreso_egreso';
import rutasInseminacion from '../routes/inseminacion';
import rutasItems from '../routes/item';
import rutasMenus from '../routes/menu';

import rutasProdGlobal from '../routes/prod_global';
import rutasProdIndividual from '../routes/prod_individuales'
import rutasRol from '../routes/rol'
import rutasSubMenu from '../routes/sub_menu';
import rutasTratamiento from '../routes/tratamientos';
import rutasVacuna from '../routes/vacuna';
import rutasVenta from '../routes/venta';
import rutasEspecies from '../routes/especies';
import rutasParto from '../routes/parto';
import rutasAborto from '../routes/aborto';
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
        this.app.use(this.apiPaths.fincaPersona, rutasFincaPersona);
        this.app.use(this.apiPaths.ingresoEgreso, rutasIngresoEgreso);
        this.app.use(this.apiPaths.inseminacion, rutasInseminacion);
        this.app.use(this.apiPaths.items, rutasItems);
        this.app.use(this.apiPaths.menu, rutasMenus);
        this.app.use(this.apiPaths.prodGlobal, rutasProdGlobal);
        this.app.use(this.apiPaths.prodIndividual, rutasProdIndividual);
        this.app.use(this.apiPaths.rol, rutasRol);
        this.app.use(this.apiPaths.subMenu, rutasSubMenu);
        this.app.use(this.apiPaths.tratamientos, rutasTratamiento);
        this.app.use(this.apiPaths.vacunas, rutasVacuna);
        this.app.use(this.apiPaths.ventas, rutasVenta);
        this.app.use(this.apiPaths.especies, rutasEspecies);
        this.app.use(this.apiPaths.parto, rutasParto);
        this.app.use(this.apiPaths.aborto, rutasAborto);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor online en el puerto: `, this.port);
        });
    }
}


export default Server;
