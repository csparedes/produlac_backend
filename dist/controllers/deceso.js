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
exports.deleteDeceso = exports.putDeceso = exports.postDeceso = exports.getDeceso = exports.getDecesosPorFinca = exports.getDecesos = void 0;
const sequelize_1 = require("sequelize");
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_deceso_1 = __importDefault(require("../models/tbl_deceso"));
const getDecesos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decesos = yield tbl_deceso_1.default.findAll({
        where: {
            dec_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!decesos) {
        return res.status(400).json({
            msg: `No existe ningún deceso registrado en la base de datos`
        });
    }
    res.json({
        msg: `Lista de Decesos`,
        dato: decesos
    });
});
exports.getDecesos = getDecesos;
const getDecesosPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fin_id } = req.params;
    const decesos = yield ((_a = tbl_deceso_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
    SELECT *
    FROM tbl_deceso
    INNER JOIN tbl_animales A ON tbl_deceso.ani_id = A.ani_id
    WHERE A.fin_id = ${fin_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!decesos) {
        return res.status(400).json({
            msg: `No existe ningún deceso registrado en la base de datos`
        });
    }
    res.json({
        msg: `Lista de Decesos`,
        dato: decesos
    });
});
exports.getDecesosPorFinca = getDecesosPorFinca;
const getDeceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dec_id } = req.params;
    const deceso = yield tbl_deceso_1.default.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
        include: { model: tbl_animales_1.default }
    });
    if (!deceso) {
        return res.status(400).json({
            msg: `No existe ningún registro con el id: ${dec_id}`
        });
    }
    res.json({
        msg: `Se ha encontrado el registro con el deceso`,
        dato: [deceso]
    });
});
exports.getDeceso = getDeceso;
const postDeceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id, dec_fecha, dec_causa, dec_descripcion, } = req.body;
    const nuevoDeceso = {
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    };
    const deceso = yield tbl_deceso_1.default.build(nuevoDeceso);
    deceso.save();
    res.json({
        msg: `Se creó un nuevo Deceso :(`,
        dato: [deceso]
    });
});
exports.postDeceso = postDeceso;
const putDeceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dec_id } = req.params;
    const decesoActual = yield tbl_deceso_1.default.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
    });
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    const { ani_id, dec_fecha, dec_causa, dec_descripcion, } = req.body;
    yield decesoActual.update({
        ani_id,
        dec_fecha,
        dec_causa,
        dec_descripcion,
    });
    res.json({
        msg: `Se actualizó el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
});
exports.putDeceso = putDeceso;
const deleteDeceso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dec_id } = req.params;
    const decesoActual = yield tbl_deceso_1.default.findOne({
        where: {
            dec_id,
            dec_estado: true
        },
    });
    if (!decesoActual) {
        return res.status(400).json({
            msg: `No existe un deceso con el id: ${dec_id}`
        });
    }
    yield decesoActual.update({ estado: false });
    res.json({
        msg: `Se ha eliminado el deceso con id: ${dec_id}`,
        dato: [decesoActual]
    });
});
exports.deleteDeceso = deleteDeceso;
//# sourceMappingURL=deceso.js.map