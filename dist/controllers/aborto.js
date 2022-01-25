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
exports.deleteAborto = exports.putAborto = exports.postAborto = exports.getAbortosPorAnimal = exports.getAborto = exports.getAbortos = void 0;
const tbl_aborto_1 = __importDefault(require("../models/tbl_aborto"));
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const getAbortos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const abortos = yield tbl_aborto_1.default.findAll({
        where: {
            abo_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!abortos) {
        return res.status(400).json({
            msg: `No se encontro ningún aborto registrado`
        });
    }
    res.json({
        msg: `Lista de abortos`,
        dato: abortos
    });
});
exports.getAbortos = getAbortos;
const getAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { abo_id } = req.params;
    const aborto = yield tbl_aborto_1.default.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });
    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }
    res.json({
        msg: `Detalle del aborto`,
        dato: [aborto]
    });
});
exports.getAborto = getAborto;
const getAbortosPorAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    const aborto = yield tbl_aborto_1.default.findAll({
        where: {
            ani_idmadre: ani_id,
            abo_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle del aborto`,
        dato: aborto
    });
});
exports.getAbortosPorAnimal = getAbortosPorAnimal;
const postAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { abo_fecha, ani_idmadre, abo_descripcion } = req.body;
    const aborto = yield tbl_aborto_1.default.build({
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    });
    aborto.save();
    res.json({
        msg: `Se ha creado un nuevo registro de aborto`,
        dato: [aborto]
    });
});
exports.postAborto = postAborto;
const putAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { abo_id } = req.params;
    const aborto = yield tbl_aborto_1.default.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });
    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }
    const { abo_fecha, ani_idmadre, abo_descripcion } = req.body;
    yield aborto.update({
        abo_fecha,
        ani_idmadre,
        abo_descripcion
    });
    res.json({
        msg: `Se actualizó un nuevo aborto`,
        dato: [aborto]
    });
});
exports.putAborto = putAborto;
const deleteAborto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { abo_id } = req.params;
    const aborto = yield tbl_aborto_1.default.findOne({
        where: {
            abo_id,
            abo_estado: true
        }
    });
    if (!aborto) {
        return res.status(400).json({
            msg: `No existe ningún registro de aborto con el id: ${abo_id}`
        });
    }
    yield aborto.update({ abo_estado: false });
    res.json({
        msg: `Se elimino el registro de aborto`,
        dato: [aborto]
    });
});
exports.deleteAborto = deleteAborto;
//# sourceMappingURL=aborto.js.map