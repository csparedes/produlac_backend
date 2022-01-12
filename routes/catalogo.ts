import { Router } from "express";
import { deleteCatalogo, getCatalogo, getCatalogos, postCatalogo, putCatalogo } from "../controllers/catalogo";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarCampos], getCatalogos);
router.get('/:cat_id', [validarCampos], getCatalogo);
router.post('/', [validarCampos], postCatalogo);
router.put('/:cat_id', [validarCampos], putCatalogo);
router.delete('/:cat_id', [validarCampos], deleteCatalogo);

export default router;