"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const finca_1 = require("../controllers/finca");
const validar_campos_1 = __importDefault(require("../middlewares/validar_campos"));
const router = express_1.Router();
router.get('/', [validar_campos_1.default], finca_1.getFincas);
router.get('/:fin_id', [validar_campos_1.default], finca_1.getFinca);
router.post('/', [validar_campos_1.default], finca_1.postFinca);
router.put('/:fin_id', [validar_campos_1.default], finca_1.putFinca);
router.delete('/:fin_id', [validar_campos_1.default], finca_1.deleteFinca);
exports.default = router;
//# sourceMappingURL=finca.js.map