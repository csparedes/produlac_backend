import {
    Router
} from "express";
import {
    deleteTratamiento,
    getTratamiento,
    getTratamientosAnimal,
    getTratamientos,
    postTratamiento,
    putTratamiento
} from "../controllers/tratamiento";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getTratamientos);
router.get('/:tra_id', [validarJWT, validarCampos], getTratamiento);
router.get('/animal/:ani_id', [validarJWT, validarCampos], getTratamientosAnimal);
router.post('/', [validarJWT, validarCampos], postTratamiento);
router.put('/:tra_id', [validarJWT, validarCampos], putTratamiento);
router.delete('/:tra_id', [validarJWT, validarCampos], deleteTratamiento);
export default router;