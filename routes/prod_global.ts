import {
    Router
} from "express";
import {
    deleteProdGlobar,
    getProdGlobal,
    getProdGlobales,
    postProdGlobalesPorFinca,
    getProdGlobalesPorFincaEditar,
    postProdGlobal,
    putProdGlobal
} from "../controllers/prod_global";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getProdGlobales);
router.get('/:pglo_id', [validarJWT, validarCampos], getProdGlobal);
router.post('/fechas', [validarJWT, validarCampos], postProdGlobalesPorFinca);
router.get('/editar/:fin_id', [validarJWT, validarCampos], getProdGlobalesPorFincaEditar);
router.post('/', [validarJWT, validarCampos], postProdGlobal);
router.put('/:pglo_id', [validarJWT, validarCampos], putProdGlobal);
router.delete('/:pglo_id', [validarJWT, validarCampos], deleteProdGlobar);
export default router;