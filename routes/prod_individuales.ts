import { Router } from "express";
import { deleteProdIndividual, getProdIndividual, getProdIndividuales, postProdIndividuales, postProdIndividualPorFechas, putProdIndividual } from "../controllers/prod_individual";
import validarJWT from "../helpers/validarJWT";
import validarCampos from "../middlewares/validar_campos";


const router = Router();
router.get('/', [validarJWT, validarCampos], getProdIndividuales);
router.get('/:pro_id', [validarJWT, validarCampos], getProdIndividual);
router.post('/', [validarJWT, validarCampos], postProdIndividuales);
router.post('/:ani_id', [validarJWT, validarCampos], postProdIndividualPorFechas);
router.put('/:pro_id', [validarJWT, validarCampos], putProdIndividual);
router.delete('/:pro_id', [validarJWT, validarCampos], deleteProdIndividual);
export default router;