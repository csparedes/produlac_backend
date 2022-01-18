"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_1 = require("../controllers/item");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], item_1.getItems);
router.get('/:ite_id', [validarJWT_1.default, validar_campos_1.default], item_1.getItem);
router.get('/categoria/:ite_id', [validarJWT_1.default, validar_campos_1.default], item_1.getItemsPorCategoria);
router.post('/', [validarJWT_1.default, validar_campos_1.default], item_1.postItem);
router.put('/:ite_id', [validarJWT_1.default, validar_campos_1.default], item_1.putItem);
router.delete('/:ite_id', [validarJWT_1.default, validar_campos_1.default], item_1.deleteItem);
exports.default = router;
//# sourceMappingURL=item.js.map