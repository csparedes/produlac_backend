import { Router } from "express";
import { deleteDeceso, getDeceso, getDecesos, postDeceso, putDeceso } from "../controllers/deceso";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.get('/', [validarCampos], getDecesos);
router.get('/:dec:id', [validarCampos], getDeceso);
router.post('/', [validarCampos], postDeceso);
router.put('/:dec_id', [validarCampos], putDeceso);
router.delete('/:dec_id', [validarCampos], deleteDeceso);

export default router;