"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingreso_egreso_1 = require("../controllers/ingreso_egreso");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.getIngresosEgresos);
router.get('/:ing_id', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.getIngresoEgreso);
router.get('/finca/:fin_id', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.getIngresosEgresosPorFinca);
router.post('/', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.postIngresoEgreso);
router.put('/:ing_id', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.putIngresoEgreso);
router.delete('/:ing_id', [validarJWT_1.default, validar_campos_1.default], ingreso_egreso_1.deleteIngresoEgreso);
exports.default = router;
//# sourceMappingURL=ingreso_egreso.js.map