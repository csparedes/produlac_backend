import {
    Router
} from "express";
import {
    deleteFincaPersona,
    getFincaPersona,
    getFincasDePersona,
    getFincasPersonas,
    getPersonasPorFinca,
    postFincaPersona,
    putFincaPersona
} from "../controllers/finca_persona";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getFincasPersonas);
router.get('/:fper_id', [validarJWT, validarCampos], getFincaPersona);
router.get('/fincasPorPersona/:per_id', [validarJWT, validarCampos], getFincasDePersona);
router.get('/personasPorFinca/:fin_id', [validarJWT, validarCampos], getPersonasPorFinca);
router.post('/', [validarJWT, validarCampos], postFincaPersona);
router.put('/:fper_id', [validarJWT, validarCampos], putFincaPersona);
router.delete('/:fper_id', [validarJWT, validarCampos], deleteFincaPersona);

export default router;