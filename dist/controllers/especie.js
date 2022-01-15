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
exports.deleteEspecie = exports.putEspecie = exports.postEspecie = exports.getEspecie = exports.getEspecies = void 0;
const tbl_especies_1 = __importDefault(require("../models/tbl_especies"));
const getEspecies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const especies = yield tbl_especies_1.default.findAll({
        where: {
            esp_estado: true
        }
    });
    if (!especies) {
        return res.status(400).json({
            msg: `No existe ninguna especie animal en la base de datos`
        });
    }
    res.json({
        msg: `Lista de especies animales`,
        dato: especies,
    });
});
exports.getEspecies = getEspecies;
const getEspecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esp_id } = req.params;
    const especie = yield tbl_especies_1.default.findByPk(esp_id);
    if (!especie) {
        return res.status(400).json({
            msg: `No existe ninguna especie con el id: ${esp_id}`
        });
    }
    res.json({
        msg: `Detalle de la especie`,
        dato: [especie]
    });
});
exports.getEspecie = getEspecie;
const postEspecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esp_nombre, cat_id } = req.body;
    const especieBuscada = yield tbl_especies_1.default.findOne({
        where: {
            esp_nombre
        }
    });
    if (especieBuscada) {
        return res.status(400).json({
            msg: `Ya existe la especie animal: ${esp_nombre}`
        });
    }
    const especie = yield tbl_especies_1.default.build({ esp_nombre, cat_id });
    especie.save();
    return res.json({
        msg: `Se agregó la especie ${esp_nombre}`,
        dato: [especie]
    });
});
exports.postEspecie = postEspecie;
const putEspecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esp_id } = req.params;
    const especie = yield tbl_especies_1.default.findByPk(esp_id);
    if (!especie) {
        return res.status(400).json({
            msg: `No existe la especie con el id: ${esp_id}`
        });
    }
    const { esp_nombre, cat_id } = req.body;
    yield especie.update({ esp_nombre, cat_id });
    res.json({
        msg: `Se actualizó la especie`,
        dato: [especie]
    });
});
exports.putEspecie = putEspecie;
const deleteEspecie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esp_id } = req.params;
    const especie = yield tbl_especies_1.default.findByPk(esp_id);
    if (!especie) {
        return res.status(400).json({
            msg: `No existe la especie con el id: ${esp_id}`
        });
    }
    yield especie.update({ esp_estado: false });
    res.json({
        msg: `Se la eliminó especie`,
        dato: [especie]
    });
});
exports.deleteEspecie = deleteEspecie;
//# sourceMappingURL=especie.js.map