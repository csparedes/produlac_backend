"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tratamiento_1 = require("../controllers/tratamiento");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], tratamiento_1.getTratamientos);
router.get('/:tra_id', [validarJWT_1.default, validar_campos_1.default], tratamiento_1.getTratamiento);
router.post('/', [validarJWT_1.default, validar_campos_1.default], tratamiento_1.postTratamiento);
router.put('/:tra_id', [validarJWT_1.default, validar_campos_1.default], tratamiento_1.putTratamiento);
router.delete('/:tra_id', [validarJWT_1.default, validar_campos_1.default], tratamiento_1.deleteTratamiento);
exports.default = router;
//# sourceMappingURL=tratamientos.js.map