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
exports.deleteRol = exports.putRol = exports.postRol = exports.getRol = exports.getRoles = void 0;
const tbl_rol_1 = __importDefault(require("../models/tbl_rol"));
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield tbl_rol_1.default.findAll({
        where: {
            rol_estado: true
        }
    });
    if (!roles) {
        return res.status(400).json({
            msg: `No existe ningún rol en el sistema`
        });
    }
    res.json({
        msg: `Listado de Roles`,
        dato: roles
    });
});
exports.getRoles = getRoles;
const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol_id } = req.params;
    const rol = yield tbl_rol_1.default.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    res.json({
        msg: `Detalle de rol`,
        dato: [rol]
    });
});
exports.getRol = getRol;
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol_nombre } = req.body;
    const rolBuscado = yield tbl_rol_1.default.findOne({
        where: {
            rol_nombre,
            rol_estado: true
        }
    });
    if (rolBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese rol.`
        });
    }
    const rol = yield tbl_rol_1.default.build({ rol_nombre });
    rol.save();
    res.json({
        msg: `Se ha creado un nuevo Rol`,
        dato: [rol]
    });
});
exports.postRol = postRol;
const putRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol_id } = req.params;
    const rol = yield tbl_rol_1.default.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    const { rol_nombre } = req.body;
    yield rol.update({ rol_nombre });
    res.json({
        msg: `Se actualizó el rol de id: ${rol_id}`,
        dato: [rol]
    });
});
exports.putRol = putRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol_id } = req.params;
    const rol = yield tbl_rol_1.default.findOne({
        where: {
            rol_id,
            rol_estado: true
        }
    });
    if (!rol) {
        return res.status(400).json({
            msg: `No existe el rol de id: ${rol_id}`
        });
    }
    yield rol.update({ rol_estado: false });
    res.json({
        msg: `Se eliminó el rol de id: ${rol_id}`,
        dato: [rol]
    });
});
exports.deleteRol = deleteRol;
//# sourceMappingURL=rol.js.map