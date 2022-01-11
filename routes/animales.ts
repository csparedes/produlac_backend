import { Router } from 'express'
import { deleteAnimal, getAnimal, getAnimales, postAnimal, putAnimal } from '../controllers/animales';
import validarCampos from '../middlewares/validar_campos'

const router = Router();

router.get('/', [validarCampos], getAnimales);
router.get('/:ani_codigo', [validarCampos], getAnimal);
router.post('/', [validarCampos], postAnimal);
router.put('/:ani_codigo_url', [validarCampos], putAnimal);
router.delete('/:ani:codigo_url', [validarCampos], deleteAnimal);

export default router;