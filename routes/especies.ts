import { Router } from "express";
import { deleteEspecie, getEspecie, getEspecies, postEspecie, putEspecie } from "../controllers/especie";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getEspecies);
router.get('/:esp_id', [validarJWT, validarCampos], getEspecie);
router.post('/', [validarJWT, validarCampos], postEspecie);
router.put('/:esp_id', [validarJWT, validarCampos], putEspecie);
router.delete('/:esp_id', [validarJWT, validarCampos], deleteEspecie);
export default router;