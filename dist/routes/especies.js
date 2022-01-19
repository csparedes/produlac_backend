"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especie_1 = require("../controllers/especie");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], especie_1.getEspecies);
router.get('/:esp_id', [validarJWT_1.default, validar_campos_1.default], especie_1.getEspecie);
router.post('/', [validarJWT_1.default, validar_campos_1.default], especie_1.postEspecie);
router.put('/:esp_id', [validarJWT_1.default, validar_campos_1.default], especie_1.putEspecie);
router.delete('/:esp_id', [validarJWT_1.default, validar_campos_1.default], especie_1.deleteEspecie);
exports.default = router;
//# sourceMappingURL=especies.js.map