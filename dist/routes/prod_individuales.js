"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prod_individual_1 = require("../controllers/prod_individual");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.getProdIndividuales);
router.get('/:pro_id', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.getProdIndividual);
router.get('/finca/:fin_id', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.getProdIndividualPorFinca);
router.post('/', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.postProdIndividuales);
router.post('/:ani_id', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.postProdIndividualPorAnimal);
router.put('/:pro_id', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.putProdIndividual);
router.delete('/:pro_id', [validarJWT_1.default, validar_campos_1.default], prod_individual_1.deleteProdIndividual);
exports.default = router;
//# sourceMappingURL=prod_individuales.js.map