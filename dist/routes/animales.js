"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const animales_1 = require("../controllers/animales");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], animales_1.getAnimales);
router.get('/:ani_codigo', [validarJWT_1.default, validar_campos_1.default], animales_1.getAnimal);
router.post('/', [validarJWT_1.default, validar_campos_1.default], animales_1.postAnimal);
router.put('/:ani_codigo_url', [validarJWT_1.default, validar_campos_1.default], animales_1.putAnimal);
router.delete('/:ani:codigo_url', [validarJWT_1.default, validar_campos_1.default], animales_1.deleteAnimal);
exports.default = router;
//# sourceMappingURL=animales.js.map