import { Router } from "express";
import { deleteMenu, getMenu, getMenus, postMenu, putMenu } from "../controllers/menu";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getMenus);
router.get('/:men_id', [validarJWT, validarCampos], getMenu);
router.post('/', [validarJWT, validarCampos], postMenu);
router.put('/:men_id', [validarJWT, validarCampos], putMenu);
router.delete('/:men_id', [validarJWT, validarCampos], deleteMenu);

export default router;