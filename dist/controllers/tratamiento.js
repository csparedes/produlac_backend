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
exports.deleteTratamiento = exports.putTratamiento = exports.postTratamiento = exports.getTratamientoAnimal = exports.getTratamiento = exports.getTratamientos = void 0;
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_tratamiento_1 = __importDefault(require("../models/tbl_tratamiento"));
const getTratamientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tratamientos = yield tbl_tratamiento_1.default.findAll({
        where: {
            tra_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!tratamientos) {
        return res.status(400).json({
            msg: `No existe tratamientos en la base de datos`
        });
    }
    res.json({
        msg: `Lista de tratamietos`,
        dato: tratamientos
    });
});
exports.getTratamientos = getTratamientos;
const getTratamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tra_id } = req.params;
    const tratamiento = yield tbl_tratamiento_1.default.findOne({
        where: {
            tra_id,
            tra_estado: true
        },
        include: { model: tbl_animales_1.default }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe tratamiento con el id: ${tra_id}`
        });
    }
    res.json({
        msg: `Detalle de tratamiento`,
        dato: [tratamiento]
    });
});
exports.getTratamiento = getTratamiento;
const getTratamientoAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    const tratamiento = yield tbl_tratamiento_1.default.findOne({
        where: {
            ani_id,
            tra_estado: true
        },
        include: { model: tbl_animales_1.default }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe tratamiento con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle de tratamiento`,
        dato: [tratamiento]
    });
});
exports.getTratamientoAnimal = getTratamientoAnimal;
const postTratamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tra_fecha, ani_id, tra_diagnostico, tra_medicamento, tra_diastratamiento, tra_descripcion } = req.body;
    const tratamiento = yield tbl_tratamiento_1.default.build({
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    });
    tratamiento.save();
    res.json({
        msg: `Se creó un nuevo tratamiento`,
        dato: [tratamiento]
    });
});
exports.postTratamiento = postTratamiento;
const putTratamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tra_id } = req.params;
    const tratamiento = yield tbl_tratamiento_1.default.findOne({
        where: {
            tra_id,
            tra_estado: true
        }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe ningún tratamiento con el id: ${tra_id}`
        });
    }
    const { tra_fecha, ani_id, tra_diagnostico, tra_medicamento, tra_diastratamiento, tra_descripcion } = req.body;
    yield tratamiento.update({
        tra_fecha,
        ani_id,
        tra_diagnostico,
        tra_medicamento,
        tra_diastratamiento,
        tra_descripcion
    });
    res.json({
        msg: `Se actualizó el tratamiento de id: ${tra_id}`,
        dato: [tratamiento]
    });
});
exports.putTratamiento = putTratamiento;
const deleteTratamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tra_id } = req.params;
    const tratamiento = yield tbl_tratamiento_1.default.findOne({
        where: {
            tra_id,
            tra_estado: true
        }
    });
    if (!tratamiento) {
        return res.status(400).json({
            msg: `No existe ningún tratamiento con el id: ${tra_id}`
        });
    }
    yield tratamiento.update({ tra_estado: false });
    res.json({
        msg: `Se eliminó el tratamiento de id: ${tra_id}`,
        dato: [tratamiento]
    });
});
exports.deleteTratamiento = deleteTratamiento;
//# sourceMappingURL=tratamiento.js.map