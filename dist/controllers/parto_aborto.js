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
exports.deletePartoAborto = exports.putPartoAborto = exports.postPartoAborto = exports.getPartoAborto = exports.getPartosAbortos = void 0;
const tbl_partoaborto_1 = __importDefault(require("../models/tbl_partoaborto"));
const getPartosAbortos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partosAbortos = yield tbl_partoaborto_1.default.findAll({
        where: {
            par_estado: true
        }
    });
    if (!partosAbortos) {
        return res.status(400).json({
            msg: `No existen ningún parto/aborto`
        });
    }
    res.json({
        msg: `Lista de partos/abortos`,
        dato: partosAbortos
    });
});
exports.getPartosAbortos = getPartosAbortos;
const getPartoAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const partoAborto = yield tbl_partoaborto_1.default.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No se encontró un registro con el id: ${par_id}`
        });
    }
    res.json({
        msg: `Detalle de parto/aborto`,
        dato: [partoAborto]
    });
});
exports.getPartoAborto = getPartoAborto;
const postPartoAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_fecha, ani_idmadre, ani_idhijo, ite_idpartoaborto } = req.body;
    const partoAborto = yield tbl_partoaborto_1.default.build({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    });
    partoAborto.save();
    res.json({
        msg: `Se creo un nuevo registo de parto/aborto`,
        dato: [partoAborto]
    });
});
exports.postPartoAborto = postPartoAborto;
const putPartoAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const partoAborto = yield tbl_partoaborto_1.default.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No existe un registro de parto/aborto con el id: ${par_id}`
        });
    }
    const { par_fecha, ani_idmadre, ani_idhijo, ite_idpartoaborto } = req.body;
    yield partoAborto.update({
        par_fecha,
        ani_idmadre,
        ani_idhijo,
        ite_idpartoaborto
    });
    res.json({
        msg: `Se acutalizó el registro parto/aborto con id: ${par_id}`,
        dato: [partoAborto]
    });
});
exports.putPartoAborto = putPartoAborto;
const deletePartoAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { par_id } = req.params;
    const partoAborto = yield tbl_partoaborto_1.default.findByPk(par_id);
    if (!partoAborto) {
        return res.status(400).json({
            msg: `No existe un registro de parto/aborto con el id: ${par_id}`
        });
    }
    yield partoAborto.update({ par_estado: false });
    res.json({
        msg: `Se eliminó el registro parto/aborto con id: ${par_id}`,
        dato: [partoAborto]
    });
});
exports.deletePartoAborto = deletePartoAborto;
//# sourceMappingURL=parto_aborto.js.map