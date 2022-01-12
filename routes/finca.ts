import { Router } from "express";
import { deleteFinca, getFinca, getFincas, postFinca, putFinca } from "../controllers/finca";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarCampos], getFincas);
router.get('/:fin_id', [validarCampos], getFinca);
router.post('/', [validarCampos], postFinca);
router.put('/:fin_id', [validarCampos], putFinca);
router.delete('/:fin_id', [validarCampos], deleteFinca);

export default router;