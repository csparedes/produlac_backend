import { Router } from "express";
import { deleteRol, getRol, getRoles, postRol, putRol } from "../controllers/rol";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getRoles);
router.get('/:rol_id', [validarJWT, validarCampos], getRol);
router.post('/', [validarJWT, validarCampos], postRol);
router.put('/:rol_id', [validarJWT, validarCampos], putRol);
router.delete('/:rol_id', [validarJWT, validarCampos], deleteRol);
export default router;