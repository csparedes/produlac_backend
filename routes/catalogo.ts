import {
    Router
} from "express";
import {
    deleteCatalogo,
    getCatalogo,
    getCatalogos,
    postCatalogo,
    putCatalogo
} from "../controllers/catalogo";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getCatalogos);
router.get('/:cat_id', [validarJWT, validarCampos], getCatalogo);
router.post('/', [validarJWT, validarCampos], postCatalogo);
router.put('/:cat_id', [validarJWT, validarCampos], putCatalogo);
router.delete('/:cat_id', [validarJWT, validarCampos], deleteCatalogo);

export default router;