import { Router } from "express";
import { deleteItem, getItem, getItems, getItemsPorCategoria, postItem, putItem } from "../controllers/item";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getItems);
router.get('/:ite_id', [validarJWT, validarCampos], getItem);
router.get('/categoria/:cat_id', [validarJWT, validarCampos], getItemsPorCategoria);
router.post('/', [validarJWT, validarCampos], postItem);
router.put('/:ite_id', [validarJWT, validarCampos], putItem);
router.delete('/:ite_id', [validarJWT, validarCampos], deleteItem);

export default router;