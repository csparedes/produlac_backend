import { Router } from "express";
import { deleteInseminacion, getInseminacion, getInseminaciones, postInseminacion, putInseminacion } from "../controllers/inseminacion";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getInseminaciones);
router.get('/:ins_id', [validarJWT, validarCampos], getInseminacion);
router.post('/', [validarJWT, validarCampos], postInseminacion);
router.put('/:ins_id', [validarJWT, validarCampos], putInseminacion);
router.delete('/:ins_id', [validarJWT, validarCampos], deleteInseminacion);

export default router;