"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vacuna_1 = require("../controllers/vacuna");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], vacuna_1.getVacunas);
router.get('/:vac_id', [validarJWT_1.default, validar_campos_1.default], vacuna_1.getVacuna);
router.get('/animal/:ani_id', [validarJWT_1.default, validar_campos_1.default], vacuna_1.getVacunasPorAnimal);
router.post('/', [validarJWT_1.default, validar_campos_1.default], vacuna_1.postVacuna);
router.put('/:vac_id', [validarJWT_1.default, validar_campos_1.default], vacuna_1.putVacuna);
router.delete('/:vac_id', [validarJWT_1.default, validar_campos_1.default], vacuna_1.deleteVacuna);
exports.default = router;
//# sourceMappingURL=vacuna.js.map