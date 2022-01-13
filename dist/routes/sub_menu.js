"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sub_menu_1 = require("../controllers/sub_menu");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], sub_menu_1.getSubMenus);
router.get('/:smen_id', [validarJWT_1.default, validar_campos_1.default], sub_menu_1.getSubMenu);
router.post('/', [validarJWT_1.default, validar_campos_1.default], sub_menu_1.postSubMenu);
router.put('/:smen_id', [validarJWT_1.default, validar_campos_1.default], sub_menu_1.putSubMenu);
router.delete('/:smen_id', [validarJWT_1.default, validar_campos_1.default], sub_menu_1.deleteSubMenu);
exports.default = router;
//# sourceMappingURL=sub_menu.js.map