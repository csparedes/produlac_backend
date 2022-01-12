import { Router } from 'express'
import { deleteAnimal, getAnimal, getAnimales, postAnimal, putAnimal } from '../controllers/animales';
import validarJWT from '../helpers/validarJWT';
import validarCampos from '../middlewares/validar_campos'

const router = Router();

router.get('/', [validarJWT,validarCampos], getAnimales);
router.get('/:ani_codigo', [validarJWT,validarCampos], getAnimal);
router.post('/', [validarJWT,validarCampos], postAnimal);
router.put('/:ani_codigo_url', [validarJWT,validarCampos], putAnimal);
router.delete('/:ani:codigo_url', [validarJWT,validarCampos], deleteAnimal);

export default router;