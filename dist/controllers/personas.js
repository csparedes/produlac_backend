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
exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const tbl_rol_1 = __importDefault(require("../models/tbl_rol"));
require('../models/asociaciones');
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personas = yield tbl_personas_1.default.findAll({
        where: {
            per_estado: true
        },
        include: {
            model: tbl_rol_1.default
        }
    });
    if (!personas) {
        return res.status(400).json({
            msg: "Error en el crud personas"
        });
    }
    res.json({
        msg: "Lista de personas",
        dato: personas
    });
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_id } = req.params;
    const persona = yield tbl_personas_1.default.findOne({
        where: {
            per_id,
            per_estado: true
        }
    });
    if (!persona) {
        return res.status(400).json({
            msg: "No hay ninguna persona con ese id"
        });
    }
    res.json({
        msg: 'Persona encontrada',
        dato: [persona]
    });
});
exports.getPersona = getPersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_nombre, per_apellido, per_usuario, per_contraseña, per_imagen, per_cedula, per_correo, per_telefono, per_direccion, rol_id } = req.body;
    const personaBuscada = yield tbl_personas_1.default.findOne({
        where: {
            per_cedula,
            per_correo,
            per_usuario,
            per_estado: true
        }
    });
    if (personaBuscada) {
        return res.status(401).json({
            msg: "Ya existe aquella persona en la base de datos"
        });
    }
    const salt = bcrypt_1.default.genSaltSync();
    const nuevaPersona = {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña: bcrypt_1.default.hashSync(per_contraseña, salt),
        per_imagen,
        per_cedula,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    };
    const persona = yield tbl_personas_1.default.build(nuevaPersona);
    yield persona.save();
    const personaC = yield tbl_personas_1.default.findOne({
        where: {
            per_nombre,
            per_apellido,
            per_usuario,
            per_contraseña: bcrypt_1.default.hashSync(per_contraseña, salt),
            per_imagen,
            per_cedula,
            per_correo,
            per_telefono,
            per_direccion,
            rol_id,
            per_estado: true
        }
    });
    if (!personaC) {
        return res.status(400).json({
            msg: "No hay ninguna persona con ese id"
        });
    }
    res.json({
        msg: 'Se ha creado una nueva persona',
        dato: [personaC]
    });
});
exports.postPersona = postPersona;
const putPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_id } = req.params;
    const personaActual = yield tbl_personas_1.default.findOne({
        where: {
            per_id,
            per_estado: true
        }
    });
    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con el: ${per_id}`
        });
    }
    const { per_nombre, per_apellido, per_usuario, per_cedula, per_contraseña, per_imagen, per_correo, per_telefono, per_direccion, rol_id } = req.body;
    const salt = bcrypt_1.default.genSaltSync();
    const nuevaPersona = {
        per_nombre,
        per_apellido,
        per_usuario,
        per_contraseña: bcrypt_1.default.hashSync(per_contraseña, salt),
        per_imagen,
        per_cedula,
        per_correo,
        per_telefono,
        per_direccion,
        rol_id
    };
    yield personaActual.update(nuevaPersona);
    res.json({
        msg: `Se actualizó la persona: ${per_nombre} ${per_apellido}`,
        dato: [nuevaPersona]
    });
});
exports.putPersona = putPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_id } = req.params;
    const personaActual = yield tbl_personas_1.default.findOne({
        where: {
            per_id,
            per_estado: true
        }
    });
    if (!personaActual) {
        return res.status(401).json({
            msg: `Aquella persona no existe con el: ${per_id}`
        });
    }
    yield personaActual.update({ per_estado: false });
    res.json({
        msg: `La persona se ha eliminado de la base de datos`,
        dato: [personaActual]
    });
});
exports.deletePersona = deletePersona;
//# sourceMappingURL=personas.js.map