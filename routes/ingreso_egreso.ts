import { Router } from "express";
import { deleteIngresoEgreso, getIngresoEgreso, getIngresosEgresos, getIngresosEgresosPorFinca, postIngresoEgreso, putIngresoEgreso } from "../controllers/ingreso_egreso";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarJWT, validarCampos], getIngresosEgresos);
router.get('/:ing_id', [validarJWT, validarCampos], getIngresoEgreso);
router.get('/finca/:fin_id', [validarJWT, validarCampos], getIngresosEgresosPorFinca);
router.post('/', [validarJWT, validarCampos], postIngresoEgreso);
router.put('/:ing_id', [validarJWT, validarCampos], putIngresoEgreso);
router.delete('/:ing_id', [validarJWT, validarCampos], deleteIngresoEgreso);

export default router;