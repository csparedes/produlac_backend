"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    const secretKey = process.env.SECRETKEYJWT;
    if (!token) {
        return res.status(401).json({
            msg: `No hay token en la petición`
        });
    }
    try {
        //@ts-ignore
        const uid = jsonwebtoken_1.default.verify(token, secretKey);
        const persona = uid.uid + ',';
        const per_usuario = persona.split(',', 1)[0];
        const usuario = yield tbl_personas_1.default.findOne({
            where: {
                per_usuario
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Token no válido, el usuario no existe en la base de datos'
            });
        }
        next();
    }
    catch (err) {
        console.log(`Error validando el jwt: ${err}`);
        res.status(402).json({
            msg: `Token inválido, quizás caducó`,
            err
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validarJWT.js.map