import { Router } from 'express'
import { deletePersona, getPersona, getPersonas, postPersona, putPersona } from '../controllers/personas';
import validarJWT from '../helpers/validarJWT';
import validarCampos from '../middlewares/validar_campos'

const router = Router();

router.get('/', [validarJWT, validarCampos,], getPersonas);
router.get('/:per_id', [validarJWT,validarCampos], getPersona);
router.post('/', [validarJWT, validarCampos], postPersona);
router.put('/:per_id', [validarJWT, validarCampos], putPersona);
router.delete('/:per_id', [validarJWT, validarCampos], deletePersona);

export default router;
