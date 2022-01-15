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
exports.deleteInseminacion = exports.putInseminacion = exports.postInseminacion = exports.getInseminacion = exports.getInseminaciones = void 0;
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_inseminacion_1 = __importDefault(require("../models/tbl_inseminacion"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const getInseminaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inseminaciones = yield tbl_inseminacion_1.default.findAll({
        where: {
            ins_estado: true
        },
        include: [
            { model: tbl_animales_1.default },
            { model: tbl_personas_1.default }
        ]
    });
    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }
    res.json({
        msg: `Lista de inseminaciones`,
        dato: inseminaciones
    });
});
exports.getInseminaciones = getInseminaciones;
const getInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findByPk(ins_id, {
        include: [
            { model: tbl_personas_1.default },
            { model: tbl_animales_1.default }
        ]
    });
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }
    res.json({
        msg: `Detalle de Inseminación`,
        dato: [inseminacion]
    });
});
exports.getInseminacion = getInseminacion;
const postInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_fechainseminacion, per_id, ani_id, ins_fechacomprobacion, ins_cargada, ins_tipoinseminacion, ani_idpadre, ins_numpajuela, ins_descripcion, } = req.body;
    const inseminacion = yield tbl_inseminacion_1.default.build({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });
    inseminacion.save();
    res.json({
        msg: `Se ha creado un nuevo registro de inseminación.`,
        dato: [inseminacion]
    });
});
exports.postInseminacion = postInseminacion;
const putInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findByPk(ins_id);
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }
    const { ins_fechainseminacion, per_id, ani_id, ins_fechacomprobacion, ins_cargada, ins_tipoinseminacion, ani_idpadre, ins_numpajuela, ins_descripcion, } = req.body;
    yield inseminacion.update({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });
    res.json({
        msg: `Se actualizó el dato de inseminación`,
        dato: [inseminacion]
    });
});
exports.putInseminacion = putInseminacion;
const deleteInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findByPk(ins_id);
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el dato de inseminación con id: ${ins_id}`
        });
    }
    yield inseminacion.update({ ins_estado: false });
    res.json({
        msg: `Se eliminó el dato de inseminación con id: ${ins_id}`,
        dato: [inseminacion]
    });
});
exports.deleteInseminacion = deleteInseminacion;
//# sourceMappingURL=inseminacion.js.map