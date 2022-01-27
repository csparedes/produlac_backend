import {
    Router
} from "express";
import {
    deleteVacuna,
    getVacuna,
    getVacunaPorAnimal,
    getVacunas,
    postVacuna,
    putVacuna
} from "../controllers/vacuna";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getVacunas);
router.get('/:vac_id', [validarJWT, validarCampos], getVacuna);
router.get('/animal/:ani_id', [validarJWT, validarCampos], getVacunaPorAnimal);
router.post('/', [validarJWT, validarCampos], postVacuna);
router.put('/:vac_id', [validarJWT, validarCampos], putVacuna);
router.delete('/:vac_id', [validarJWT, validarCampos], deleteVacuna);
export default router;