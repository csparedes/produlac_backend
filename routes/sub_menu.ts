import { Router } from "express";
import { deleteSubMenu, getSubMenu, getSubMenus, postSubMenu, putSubMenu } from "../controllers/sub_menu";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();
router.get('/', [validarJWT, validarCampos], getSubMenus);
router.get('/:smen_id', [validarJWT, validarCampos], getSubMenu);
router.post('/', [validarJWT, validarCampos], postSubMenu);
router.put('/:smen_id', [validarJWT, validarCampos], putSubMenu);
router.delete('/:smen_id', [validarJWT, validarCampos], deleteSubMenu);
export default router;