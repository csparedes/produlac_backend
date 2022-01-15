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
exports.deleteFinca = exports.putFinca = exports.postFinca = exports.getFinca = exports.getFincas = void 0;
const tbl_finca_1 = __importDefault(require("../models/tbl_finca"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const getFincas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fincas = yield tbl_finca_1.default.findAll({
        where: {
            fin_estado: true
        },
        include: {
            model: tbl_personas_1.default
        }
    });
    if (!fincas) {
        return res.status(400).json({
            msg: `No existe ninguna finca en la base de datos`
        });
    }
    res.json({
        msg: `Listado de Fincas`,
        fincas
    });
});
exports.getFincas = getFincas;
const getFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_id } = req.params;
    const fincaBuscada = yield tbl_finca_1.default.findByPk(fin_id, { include: { model: tbl_personas_1.default } });
    if (!fincaBuscada) {
        return res.status(400).json({
            msg: `No existe ninguna finca con el id: ${fin_id}`
        });
    }
    res.json({
        msg: `Detalles de la Finca`,
        finca: fincaBuscada
    });
});
exports.getFinca = getFinca;
const postFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_nombre, fin_extension, fin_imagen, fin_pais, fin_provincia, fin_ciudad, fin_telefono, per_id } = req.body;
    const fincaBuscar = yield tbl_finca_1.default.findOne({
        where: {
            fin_nombre
        },
    });
    if (fincaBuscar) {
        return res.status(400).json({
            msg: `Ya existe aquella finca en el sistema`
        });
    }
    const nuevaFinca = {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    };
    const finca = yield tbl_finca_1.default.build(nuevaFinca);
    finca.save();
    res.json({
        msg: `Se creó una nueva Finca`,
        finca
    });
});
exports.postFinca = postFinca;
const putFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_id } = req.params;
    const finca = yield tbl_finca_1.default.findByPk(fin_id);
    if (!finca) {
        return res.status(400).json({
            msg: `No existe la finca con el id: ${fin_id}`
        });
    }
    const { fin_nombre, fin_extension, fin_imagen, fin_pais, fin_provincia, fin_ciudad, fin_telefono, per_id } = req.body;
    const nuevaFinca = {
        fin_nombre,
        fin_extension,
        fin_imagen,
        fin_pais,
        fin_provincia,
        fin_ciudad,
        fin_telefono,
        per_id
    };
    yield finca.update(nuevaFinca);
    res.json({
        msg: `Se actualizó la finca con el id: ${fin_id}`,
        finca
    });
});
exports.putFinca = putFinca;
const deleteFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_id } = req.params;
    const finca = yield tbl_finca_1.default.findByPk(fin_id);
    if (!finca) {
        return res.status(400).json({
            msg: `No existe la finca con el id: ${fin_id}`
        });
    }
    yield finca.update({ fin_estado: false });
    res.json({
        msg: `Se eliminó la finca con el id: ${fin_id}`,
        finca
    });
});
exports.deleteFinca = deleteFinca;
//# sourceMappingURL=finca.js.map