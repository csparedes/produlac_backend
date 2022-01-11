"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: 'Ingresa bien los datos infeliz :v',
            errors
        });
    }
    next();
};
exports.default = validarCampos;
//# sourceMappingURL=validar_campos.js.map