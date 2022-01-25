"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parto_1 = require("../controllers/parto");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], parto_1.getPartos);
router.get('/:par_id', [validarJWT_1.default, validar_campos_1.default], parto_1.getPartos);
router.get('/animal/:ani_id', [validarJWT_1.default, validar_campos_1.default], parto_1.getPartosPorAnimal);
router.post('/', [validarJWT_1.default, validar_campos_1.default], parto_1.postParto);
router.put('/:par_id', [validarJWT_1.default, validar_campos_1.default], parto_1.putParto);
router.delete('/:par_id', [validarJWT_1.default, validar_campos_1.default], parto_1.deleteParto);
exports.default = router;
//# sourceMappingURL=parto.js.map