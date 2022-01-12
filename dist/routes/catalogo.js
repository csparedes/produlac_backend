"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogo_1 = require("../controllers/catalogo");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], catalogo_1.getCatalogos);
router.get('/:cat_id', [validarJWT_1.default, validar_campos_1.default], catalogo_1.getCatalogo);
router.post('/', [validarJWT_1.default, validar_campos_1.default], catalogo_1.postCatalogo);
router.put('/:cat_id', [validarJWT_1.default, validar_campos_1.default], catalogo_1.putCatalogo);
router.delete('/:cat_id', [validarJWT_1.default, validar_campos_1.default], catalogo_1.deleteCatalogo);
exports.default = router;
//# sourceMappingURL=catalogo.js.map