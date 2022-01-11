"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personas_1 = require("../controllers/personas");
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validar_campos_1.default,], personas_1.getPersonas);
router.get('/:per_cedula', [validar_campos_1.default], personas_1.getPersona);
router.post('/', [validar_campos_1.default], personas_1.postPersona);
router.put('/:per_cedula', [validar_campos_1.default], personas_1.putPersona);
router.delete('/:per_cedula', [validar_campos_1.default], personas_1.deletePersona);
exports.default = router;
//# sourceMappingURL=personas.js.map