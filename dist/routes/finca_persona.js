"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finca_persona_1 = require("../controllers/finca_persona");
const validarJWT_1 = __importDefault(require("../helpers/validarJWT"));
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.getFincasPersonas);
router.get('/:fper_id', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.getFincaPersona);
router.get('/fincasPorPersona/:per_id', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.getFincasDePersona);
router.post('/', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.postFincaPersona);
router.put('/:fper_id', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.putFincaPersona);
router.delete('/:fper_id', [validarJWT_1.default, validar_campos_1.default], finca_persona_1.deleteFincaPersona);
exports.default = router;
//# sourceMappingURL=finca_persona.js.map