import { Router } from "express";
import { deleteFinca, getFinca, getFincas, postFinca, putFinca } from "../controllers/finca";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT,validarCampos], getFincas);
router.get('/:fin_id', [validarJWT,validarCampos], getFinca);
router.post('/', [validarJWT,validarCampos], postFinca);
router.put('/:fin_id', [validarJWT, validarCampos], putFinca);
router.delete('/:fin_id', [validarJWT,validarCampos], deleteFinca);

export default router;