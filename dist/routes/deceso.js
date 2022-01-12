"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deceso_1 = require("../controllers/deceso");
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validar_campos_1.default], deceso_1.getDecesos);
router.get('/:dec:id', [validar_campos_1.default], deceso_1.getDeceso);
router.post('/', [validar_campos_1.default], deceso_1.postDeceso);
router.put('/:dec_id', [validar_campos_1.default], deceso_1.putDeceso);
router.delete('/:dec_id', [validar_campos_1.default], deceso_1.deleteDeceso);
exports.default = router;
//# sourceMappingURL=deceso.js.map