"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parto_aborto_1 = require("../controllers/parto_aborto");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], parto_aborto_1.getPartosAbortos);
router.get('/:par_id', [validarJWT_1.default, validar_campos_1.default], parto_aborto_1.getPartoAborto);
router.post('/', [validarJWT_1.default, validar_campos_1.default], parto_aborto_1.postPartoAborto);
router.put('/:par_id', [validarJWT_1.default, validar_campos_1.default], parto_aborto_1.putPartoAborto);
router.delete('/:par:id', [validarJWT_1.default, validar_campos_1.default], parto_aborto_1.deletePartoAborto);
exports.default = router;
//# sourceMappingURL=parto_aborto.js.map