import { Router } from 'express';
import { deleteParto, getPartos, postParto, putParto } from '../controllers/parto';
import validarJWT from '../helpers/validarJWT';
import validarCampos from '../middlewares/validar_campos';

const router = Router();

router.get('/', [validarJWT, validarCampos], getPartos);
router.get('/:par_id', [validarJWT, validarCampos], getPartos);
router.post('/', [validarJWT, validarCampos], postParto);
router.put('/:par_id', [validarJWT, validarCampos], putParto);
router.delete('/:par_id', [validarJWT, validarCampos], deleteParto);

export default router;