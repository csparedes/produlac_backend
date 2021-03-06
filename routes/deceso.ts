import {
    Router
} from "express";
import {
    deleteDeceso,
    getDeceso,
    getDecesos,
    getDecesosPorFinca,
    postDeceso,
    putDeceso
} from "../controllers/deceso";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getDecesos);
router.get('/:dec_id', [validarJWT, validarCampos], getDeceso);
router.get('/finca/:fin_id', [validarJWT, validarCampos], getDecesosPorFinca);
router.post('/', [validarJWT, validarCampos], postDeceso);
router.put('/:dec_id', [validarJWT, validarCampos], putDeceso);
router.delete('/:dec_id', [validarJWT, validarCampos], deleteDeceso);

export default router;