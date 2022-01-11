import { Router } from 'express'
import { check } from 'express-validator'
import { deletePersona, getPersona, getPersonas, postPersona, putPersona } from '../controllers/personas';
import validarCampos from '../middlewares/validar_campos'

const router = Router();

router.get('/', [validarCampos,], getPersonas);
router.get('/:per_cedula', [validarCampos], getPersona);
router.post('/', [validarCampos], postPersona);
router.put('/:per_cedula', [validarCampos], putPersona);
router.delete('/:per_cedula', [validarCampos], deletePersona);

export default router;
