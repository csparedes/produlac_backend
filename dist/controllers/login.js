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
exports.postLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const generarJWT_1 = __importDefault(require("../helpers/generarJWT"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_usuario, per_contraseña } = req.body;
    try {
        const usuario = yield tbl_personas_1.default.findOne({
            where: {
                per_usuario,
                per_estado: true
            }
        });
        if (!usuario) {
            return res.status(401).json({
                msg: `El usuario ${per_usuario} no existe en la base de datos`
            });
        }
        //@ts-ignore
        const checkPass = bcrypt_1.default.compareSync(per_contraseña, usuario.per_contraseña);
        if (!checkPass) {
            return res.status(400).json({
                msg: `Contraseña Incorrecta`
            });
        }
        //@ts-ignore
        const token = yield generarJWT_1.default([usuario.per_usuario, usuario.per_nombre, usuario.per_apellido, usuario.per_correo, usuario.per_telefono]);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(`Error Catch Login: ${error}`);
        res.status(500).json({
            msg: `Ha ocurrido un error de autenticación, comuníquese con el Admin`,
            dato: error
        });
    }
});
exports.postLogin = postLogin;
//# sourceMappingURL=login.js.map