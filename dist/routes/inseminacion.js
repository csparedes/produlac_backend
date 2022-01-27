"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inseminacion_1 = require("../controllers/inseminacion");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.getInseminaciones);
router.get('/:ins_id', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.getInseminacion);
router.get('/animal/:ani_id', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.getInseminacionesPorAnimal);
router.get('/finca/:fin_id', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.getInseminacionesPorFinca);
router.post('/', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.postInseminacion);
router.put('/:ins_id', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.putInseminacion);
router.delete('/:ins_id', [validarJWT_1.default, validar_campos_1.default], inseminacion_1.deleteInseminacion);
exports.default = router;
//# sourceMappingURL=inseminacion.js.map