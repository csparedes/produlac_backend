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
exports.deleteParto = exports.putParto = exports.postParto = exports.getPartosPorFinca = exports.getPartosPorAnimal = exports.getParto = exports.getPartos = void 0;
const sequelize_1 = require("sequelize");
const tbl_parto_1 = __importDefault(require("../models/tbl_parto"));
const getPartos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const partos = yield ((_a = tbl_parto_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
    SELECT parto.*,
    A1.ani_id as animalmadre_ani_id,
    A1.ani_nombre as animalmadre_ani_nombre,
    A2.ani_id as animalhijo_ani_id,
    A2.ani_nombre as animalhijo_ani_nombre
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A1 On parto.ani_idmadre=A1.ani_id
    INNER JOIN tbl_animales A2 On parto.ani_idhijo=A2.ani_id
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!partos) {
        return res.status(400).json({
            msg: "No existe ningún registro de partos"
        });
    }
    res.json({
        msg: `Lista de Partos`,
        dato: partos
    });
});
exports.getPartos = getPartos;
const getParto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const parto = yield tbl_parto_1.default.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });
    if (!parto) {
        return res.status(400).json({
            msg: `No existe un parto con el id: ${par_id}`
        });
    }
    res.json({
        msg: `Detalle de parto`,
        dato: [parto]
    });
});
exports.getParto = getParto;
const getPartosPorAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { ani_id } = req.params;
    const partos = yield ((_b = tbl_parto_1.default.sequelize) === null || _b === void 0 ? void 0 : _b.query(`
    SELECT parto.* ,
    A1.ani_id as ani_id_madre,
    A1.ani_nombre as ani_id_madre_nombre,
    A1.ani_imagen as ani_id_madre_imagen,
    A2.ani_id as ani_id_hijo,
    A2.ani_nombre as ani_id_hijo_nombre,
    A2.ani_imagen as ani_id_hijo_imagen
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A1 On parto.ani_idmadre= A1.ani_id
    INNER JOIN tbl_animales A2 On parto.ani_idhijo= A2.ani_id
    WHERE parto.ani_idmadre=${ani_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!partos) {
        return res.status(400).json({
            msg: `No existe un parto con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle de parto`,
        dato: partos
    });
});
exports.getPartosPorAnimal = getPartosPorAnimal;
const getPartosPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { fin_id } = req.params;
    const partos = yield ((_c = tbl_parto_1.default.sequelize) === null || _c === void 0 ? void 0 : _c.query(`
    SELECT parto.*,
    A.ani_id as ani_id_madre,
    A.ani_nombre as ani_id_madre_nombre,
    A.ani_imagen as ani_id_madre_imagen,
    B.ani_id as ani_id_hijo,
    B.ani_nombre as ani_id_hijo_nombre,
    B.ani_imagen as ani_id_hijo_imagen
    FROM tbl_parto as parto
    INNER JOIN tbl_animales A on parto.ani_idmadre = A.ani_id
    INNER JOIN tbl_animales B on parto.ani_idhijo = B.ani_id
    WHERE A.fin_id = ${fin_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!partos) {
        return res.status(400).json({
            msg: `No existe partos de la finca de id: ${fin_id}`
        });
    }
    res.json({
        msg: `Detalle de parto`,
        dato: partos
    });
});
exports.getPartosPorFinca = getPartosPorFinca;
const postParto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_fecha, ani_idmadre, ani_idhijo, par_descripcion } = req.body;
    const parto = yield tbl_parto_1.default.build({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    });
    parto.save();
    res.json({
        msg: `Se ha creado un nuevo parto`,
        dato: [parto]
    });
});
exports.postParto = postParto;
const putParto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const partoBuscado = yield tbl_parto_1.default.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });
    if (!partoBuscado) {
        return res.status(400).json({
            msg: `No se encontró el parto con el id: ${par_id}`
        });
    }
    const { par_fecha, ani_idmadre, ani_idhijo, par_descripcion } = req.body;
    yield partoBuscado.update({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        par_descripcion
    });
    res.json({
        msg: `Se ha actualizado un nuevo parto`,
        dato: [partoBuscado]
    });
});
exports.putParto = putParto;
const deleteParto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const partoBuscado = yield tbl_parto_1.default.findOne({
        where: {
            par_id,
            par_estado: true
        }
    });
    if (!partoBuscado) {
        return res.status(400).json({
            msg: `No se encontró el parto con el id: ${par_id}`
        });
    }
    yield partoBuscado.update({ par_estado: false });
    res.json({
        msg: `Se ha eliminado el parto`,
        dato: [partoBuscado]
    });
});
exports.deleteParto = deleteParto;
//# sourceMappingURL=parto.js.map