"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venta_1 = require("../controllers/venta");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], venta_1.getVentas);
router.get('/:ven_id', [validarJWT_1.default, validar_campos_1.default], venta_1.getVenta);
router.post('/', [validarJWT_1.default, validar_campos_1.default], venta_1.postVenta);
router.put('/:ven_id', [validarJWT_1.default, validar_campos_1.default], venta_1.putVenta);
router.delete('/:ven_id', [validarJWT_1.default, validar_campos_1.default], venta_1.deleteVenta);
exports.default = router;
//# sourceMappingURL=venta.js.map