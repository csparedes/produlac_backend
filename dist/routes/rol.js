"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], rol_1.getRoles);
router.get('/:rol_id', [validarJWT_1.default, validar_campos_1.default], rol_1.getRol);
router.post('/', [validarJWT_1.default, validar_campos_1.default], rol_1.postRol);
router.put('/:rol_id', [validarJWT_1.default, validar_campos_1.default], rol_1.putRol);
router.delete('/:rol_id', [validarJWT_1.default, validar_campos_1.default], rol_1.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.js.map