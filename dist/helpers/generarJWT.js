"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const key = process.env.SECRETKEYJWT;
        //@ts-ignore
        jsonwebtoken_1.default.sign(payload, key, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                console.log(`Error JWT: ${err}`);
                reject('No se pudo generar');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generarJWT;
//# sourceMappingURL=generarJWT.js.map