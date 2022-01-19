"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prod_global_1 = require("../controllers/prod_global");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], prod_global_1.getProdGlobales);
router.get('/:pglo_id', [validarJWT_1.default, validar_campos_1.default], prod_global_1.getProdGlobal);
router.post('/', [validarJWT_1.default, validar_campos_1.default], prod_global_1.postProdGlobal);
router.put('/:pglo_id', [validarJWT_1.default, validar_campos_1.default], prod_global_1.putProdGlobal);
router.delete('/:pglo_id', [validarJWT_1.default, validar_campos_1.default], prod_global_1.deleteProdGlobar);
exports.default = router;
//# sourceMappingURL=prod_global.js.map