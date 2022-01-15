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
exports.deleteProdGlobar = exports.putProdGlobal = exports.postProdGlobal = exports.getProdGlobal = exports.getProdGlobales = void 0;
const tbl_prodglobal_1 = __importDefault(require("../models/tbl_prodglobal"));
const getProdGlobales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodGlobales = yield tbl_prodglobal_1.default.findAll({
        where: {
            pglo_estado: true
        }
    });
    if (!prodGlobales) {
        return res.status(400).json({
            msg: `No existe ningún registro`
        });
    }
    res.json({
        msg: `Lista de prodGlobales`,
        dato: prodGlobales
    });
});
exports.getProdGlobales = getProdGlobales;
const getProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No existe ningún prodGlobal con el id: ${pglo_id}`
        });
    }
    res.json({
        msg: `Detalle de prodGlobar`,
        dato: [prodGlobal]
    });
});
exports.getProdGlobal = getProdGlobal;
const postProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_fecha, pglo_horario, pglo_litros, pglo_numvacas, fin_id } = req.body;
    const prodGlobal = yield tbl_prodglobal_1.default.build({
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    prodGlobal.save();
    res.json({
        msg: `Se agregó un nuevo registro`,
        dato: [prodGlobal]
    });
});
exports.postProdGlobal = postProdGlobal;
const putProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    const { pglo_fecha, pglo_horario, pglo_litros, pglo_numvacas, fin_id } = req.body;
    yield prodGlobal.update({
        pglo_fecha,
        pglo_horario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    res.json({
        msg: `Se actualizó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
});
exports.putProdGlobal = putProdGlobal;
const deleteProdGlobar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findByPk(pglo_id);
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    yield prodGlobal.update({ pglo_estado: false });
    res.json({
        msg: `Se eliminó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
});
exports.deleteProdGlobar = deleteProdGlobar;
//# sourceMappingURL=prod_global.js.map