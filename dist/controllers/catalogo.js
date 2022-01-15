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
exports.deleteCatalogo = exports.putCatalogo = exports.postCatalogo = exports.getCatalogo = exports.getCatalogos = void 0;
const tbl_catalogo_1 = __importDefault(require("../models/tbl_catalogo"));
const getCatalogos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catalogos = yield tbl_catalogo_1.default.findAll({
        where: {
            cat_estado: true
        }
    });
    if (!catalogos) {
        return res.status(400).json({
            msg: `No existe ningún catálogo en nuestra base de datos`
        });
    }
    res.json({
        msg: `Lista de catálogos`,
        dato: catalogos
    });
});
exports.getCatalogos = getCatalogos;
const getCatalogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_id } = req.params;
    const catalogo = yield tbl_catalogo_1.default.findByPk(cat_id);
    if (!catalogo) {
        return res.status(400).json({
            msg: `No existe ningún catálogo con el id: ${cat_id}`
        });
    }
    res.json({
        msg: 'Se encontró el catálogo',
        dato: [catalogo]
    });
});
exports.getCatalogo = getCatalogo;
const postCatalogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_nombre } = req.body;
    const catalogoBuscado = yield tbl_catalogo_1.default.findOne({
        where: {
            cat_nombre
        }
    });
    if (catalogoBuscado) {
        return res.status(400).json({
            msg: `Ya existe el catálogo: ${cat_nombre}`
        });
    }
    const catalogo = yield tbl_catalogo_1.default.build({ cat_nombre });
    catalogo.save();
    res.json({
        msg: `Se ha creado en el catálogo: ${cat_nombre}`,
        dato: [catalogo]
    });
});
exports.postCatalogo = postCatalogo;
const putCatalogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_id } = req.params;
    const catalogoBuscado = yield tbl_catalogo_1.default.findByPk(cat_id);
    if (!catalogoBuscado) {
        return res.status(400).json({
            msg: `No existe el catálogo con id: ${cat_id}`
        });
    }
    const { cat_nombre } = req.body;
    catalogoBuscado.update({ cat_nombre });
    res.json({
        msg: `Se ha actualizado el catálogo: ${cat_nombre}`,
        dato: [catalogoBuscado]
    });
});
exports.putCatalogo = putCatalogo;
const deleteCatalogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_id } = req.params;
    const catalogoBuscado = yield tbl_catalogo_1.default.findByPk(cat_id);
    if (!catalogoBuscado) {
        return res.status(400).json({
            msg: `No existe el catálogo con id: ${cat_id}`
        });
    }
    catalogoBuscado.update({ ani_estado: false });
    res.json({
        msg: `Se ha eliminado del catálogo`,
        dato: [catalogoBuscado]
    });
});
exports.deleteCatalogo = deleteCatalogo;
//# sourceMappingURL=catalogo.js.map