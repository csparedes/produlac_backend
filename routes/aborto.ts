import {
    Router
} from "express";
import {
    deleteAborto,
    getAborto,
    getAbortos,
    getAbortosPorAnimal,
    postAborto,
    putAborto
} from "../controllers/aborto";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getAbortos);
router.get('/:abo_id', [validarJWT, validarCampos], getAborto);
router.get('/animal/:ani_id', [validarJWT, validarCampos], getAbortosPorAnimal);
router.post('/', [validarJWT, validarCampos], postAborto);
router.put('/:abo_id', [validarJWT, validarCampos], putAborto);
router.delete('/:abo_id', [validarJWT, validarCampos], deleteAborto);

export default router;