import { Router } from "express";
import { deleteVacuna, getVacunas, postVacuna, putVacuna } from "../controllers/vacuna";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getVacunas);
router.get('/:vac_id', [validarJWT, validarCampos], getVacunas);
router.post('/', [validarJWT, validarCampos], postVacuna);
router.put('/:vac_id', [validarJWT, validarCampos], putVacuna);
router.delete('/:vac_id', [validarJWT, validarCampos], deleteVacuna);
export default router;