import { Router } from "express";
import { deleteProdIndividual, getProdIndividual, getProdIndividuales, getProdIndividualPorFinca, postProdIndividuales, postProdIndividualPorAnimal, putProdIndividual } from "../controllers/prod_individual";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";


const router = Router();
router.get('/', [validarJWT, validarCampos], getProdIndividuales);
router.get('/:pro_id', [validarJWT, validarCampos], getProdIndividual);
router.get('/finca/:fin_id', [validarJWT, validarCampos], getProdIndividualPorFinca);
router.post('/', [validarJWT, validarCampos], postProdIndividuales);
router.post('/:ani_id', [validarJWT, validarCampos], postProdIndividualPorAnimal);
router.put('/:pro_id', [validarJWT, validarCampos], putProdIndividual);
router.delete('/:pro_id', [validarJWT, validarCampos], deleteProdIndividual);
export default router;