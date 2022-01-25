import { Router } from 'express'
import { deleteAnimal, getAnimal, getAnimales, getAnimalesMuertosVivos, getAnimalesPorFinca, postAnimal, putAnimal } from '../controllers/animales';
import validarJWT from '../helpers/validarJWT';
import validarCampos from '../middlewares/validar_campos'

const router = Router();

router.get('/', [validarJWT,validarCampos], getAnimales);
router.get('/:ani_id', [validarJWT,validarCampos], getAnimal);
router.get('/finca/:fin_id', [validarJWT,validarCampos], getAnimalesPorFinca);
router.get('/vivos/muertos', [validarJWT,validarCampos], getAnimalesMuertosVivos);
router.post('/', [validarJWT,validarCampos], postAnimal);
router.put('/:ani_id', [validarJWT,validarCampos], putAnimal);
router.delete('/:ani_id', [validarJWT,validarCampos], deleteAnimal);

export default router;