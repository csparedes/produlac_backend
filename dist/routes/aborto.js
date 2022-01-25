"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aborto_1 = require("../controllers/aborto");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], aborto_1.getAbortos);
router.get('/:abo_id', [validarJWT_1.default, validar_campos_1.default], aborto_1.getAborto);
router.get('/animal/:ani_id', [validarJWT_1.default, validar_campos_1.default], aborto_1.getAbortosPorAnimal);
router.post('/', [validarJWT_1.default, validar_campos_1.default], aborto_1.postAborto);
router.put('/:abo_id', [validarJWT_1.default, validar_campos_1.default], aborto_1.putAborto);
router.delete('/:abo_id', [validarJWT_1.default, validar_campos_1.default], aborto_1.deleteAborto);
exports.default = router;
//# sourceMappingURL=aborto.js.map