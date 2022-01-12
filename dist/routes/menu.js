"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_1 = require("../controllers/menu");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], menu_1.getMenus);
router.get('/:men_id', [validarJWT_1.default, validar_campos_1.default], menu_1.getMenu);
router.post('/', [validarJWT_1.default, validar_campos_1.default], menu_1.postMenu);
router.put('/:men_id', [validarJWT_1.default, validar_campos_1.default], menu_1.putMenu);
router.delete('/:men_id', [validarJWT_1.default, validar_campos_1.default], menu_1.deleteMenu);
exports.default = router;
//# sourceMappingURL=menu.js.map