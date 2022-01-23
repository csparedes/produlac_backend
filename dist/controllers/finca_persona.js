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
exports.deleteFincaPersona = exports.putFincaPersona = exports.postFincaPersona = exports.getPersonasPorFinca = exports.getFincaPersona = exports.getFincasDePersona = exports.getFincasPersonas = void 0;
const tbl_finca_1 = __importDefault(require("../models/tbl_finca"));
const tbl_fincapersona_1 = __importDefault(require("../models/tbl_fincapersona"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const getFincasPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fincasPersonas = yield tbl_fincapersona_1.default.findAll({
        where: {
            fper_estado: true
        },
        include: [
            { model: tbl_personas_1.default },
            { model: tbl_finca_1.default }
        ]
    });
    if (!fincasPersonas) {
        return res.status(400).json({
            msg: `No existe ningún registro de fincas-personas en la base de datos`
        });
    }
    res.json({
        msg: `Lista de personas`,
        dato: fincasPersonas
    });
});
exports.getFincasPersonas = getFincasPersonas;
const getFincasDePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_id } = req.params;
    const fincasPersonas = yield tbl_fincapersona_1.default.findAll({
        where: {
            fper_estado: true,
            per_id
        },
        include: [
            { model: tbl_finca_1.default }
        ]
    });
    if (!fincasPersonas) {
        return res.status(400).json({
            msg: `No existe ningún registro de fincas-personas en la base de datos`
        });
    }
    res.json({
        msg: `Lista de personas`,
        dato: fincasPersonas
    });
});
exports.getFincasDePersona = getFincasDePersona;
const getFincaPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fper_id } = req.params;
    const fincaPersona = yield tbl_fincapersona_1.default.findOne({
        where: {
            fper_id,
            fper_estado: true
        }
    });
    if (!fincaPersona) {
        return res.status(400).json({
            msg: `No existe ningún registro en la base de datos`
        });
    }
    res.json({
        msg: `Detalle finca persona`,
        dato: [fincaPersona]
    });
});
exports.getFincaPersona = getFincaPersona;
const getPersonasPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_id } = req.params;
    const fincaPersona = yield tbl_fincapersona_1.default.findOne({
        where: {
            fin_id,
            fper_estado: true
        }
    });
    if (!fincaPersona) {
        return res.status(400).json({
            msg: `No existe ningún registro en la base de datos`
        });
    }
    res.json({
        msg: `Personas de una Finca`,
        dato: [fincaPersona]
    });
});
exports.getPersonasPorFinca = getPersonasPorFinca;
const postFincaPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { per_id, fin_id } = req.body;
    const fincaPersonaBuscada = yield tbl_fincapersona_1.default.findOne({
        where: {
            per_id,
            fin_id,
            fper_estado: true
        }
    });
    if (fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `La finca-persona ya se encuentra registrada`
        });
    }
    const nuevaFinca = { per_id, fin_id };
    const fincaPersona = yield tbl_fincapersona_1.default.build(nuevaFinca);
    fincaPersona.save();
    res.json({
        msg: `Se ha creado un nuevo ingreso de finca-persona`,
        dato: [fincaPersona]
    });
});
exports.postFincaPersona = postFincaPersona;
const putFincaPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = yield tbl_fincapersona_1.default.findOne({
        where: {
            fper_id,
            fper_estado: true
        }
    });
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }
    const { per_id, fin_id } = req.body;
    yield fincaPersonaBuscada.update({ per_id, fin_id });
    res.json({
        msg: `Se actualizo la entrada de id: ${fper_id}`,
        dato: [fincaPersonaBuscada]
    });
});
exports.putFincaPersona = putFincaPersona;
const deleteFincaPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fper_id } = req.params;
    const fincaPersonaBuscada = yield tbl_fincapersona_1.default.findOne({
        where: {
            fper_id,
            fper_estado: true
        }
    });
    if (!fincaPersonaBuscada) {
        return res.status(400).json({
            msg: `El registro no consta en la base de datos`
        });
    }
    yield fincaPersonaBuscada.update({ fper_estado: false });
    res.json({
        msg: `Se ha eliminado el registro de id: ${fper_id}`,
        dato: [fincaPersonaBuscada]
    });
});
exports.deleteFincaPersona = deleteFincaPersona;
//# sourceMappingURL=finca_persona.js.map