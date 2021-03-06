import {
    Router
} from 'express';
import {
    deleteParto,
    getPartosPorAnimal,
    getPartos,
    postParto,
    putParto,
    getPartosPorFinca
} from '../controllers/parto';
import validarJWT from '../helpers/validarJWT';
import validarCampos from '../middlewares/validar_campos';

const router = Router();

router.get('/', [validarJWT, validarCampos], getPartos);
router.get('/:par_id', [validarJWT, validarCampos], getPartos);
router.get('/animal/:ani_id', [validarJWT, validarCampos], getPartosPorAnimal);
router.get('/finca/:fin_id', [validarJWT, validarCampos], getPartosPorFinca);
router.post('/', [validarJWT, validarCampos], postParto);
router.put('/:par_id', [validarJWT, validarCampos], putParto);
router.delete('/:par_id', [validarJWT, validarCampos], deleteParto);

export default router;