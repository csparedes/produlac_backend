"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finca_1 = require("../controllers/finca");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], finca_1.getFincas);
router.get('/:fin_id', [validarJWT_1.default, validar_campos_1.default], finca_1.getFinca);
router.get('/persona/:per_id', [validarJWT_1.default, validar_campos_1.default], finca_1.getFincasPorPersona);
router.post('/', [validarJWT_1.default, validar_campos_1.default], finca_1.postFinca);
router.put('/:fin_id', [validarJWT_1.default, validar_campos_1.default], finca_1.putFinca);
router.delete('/:fin_id', [validarJWT_1.default, validar_campos_1.default], finca_1.deleteFinca);
exports.default = router;
//# sourceMappingURL=finca.js.map