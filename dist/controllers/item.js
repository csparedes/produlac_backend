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
exports.deleteItem = exports.putItem = exports.postItem = exports.getItem = exports.getItemsPorCategoria = exports.getItems = void 0;
const tbl_catalogo_1 = __importDefault(require("../models/tbl_catalogo"));
const tbl_item_1 = __importDefault(require("../models/tbl_item"));
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield tbl_item_1.default.findAll({
        where: {
            ite_estado: true
        },
        include: {
            model: tbl_catalogo_1.default
        }
    });
    if (!items) {
        return res.status(400).json({
            msg: `No existe la lista de items`
        });
    }
    res.json({
        msg: `Lista de Items`,
        dato: items
    });
});
exports.getItems = getItems;
const getItemsPorCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat_id } = req.params;
    const items = yield tbl_item_1.default.findAll({
        where: {
            cat_id,
            ite_estado: true
        },
        include: {
            model: tbl_catalogo_1.default
        }
    });
    if (!items) {
        return res.status(400).json({
            msg: `No existe la lista de items`
        });
    }
    res.json({
        msg: `Lista de Items`,
        dato: items
    });
});
exports.getItemsPorCategoria = getItemsPorCategoria;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ite_id } = req.params;
    const item = yield tbl_item_1.default.findOne({
        where: {
            ite_id,
            ite_estado: true
        },
        include: {
            model: tbl_catalogo_1.default
        }
    });
    if (!item) {
        return res.status(400).json({
            msg: ` No se encontró ningún detalle de item con el id: ${ite_id}`
        });
    }
    res.json({
        msg: `Detalle de Item`,
        dato: [item]
    });
});
exports.getItem = getItem;
const postItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ite_nombre, cat_id } = req.body;
    const itemBuscado = yield tbl_item_1.default.findOne({
        where: {
            ite_nombre,
            cat_id,
            ite_estado: true
        }
    });
    if (itemBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese item`
        });
    }
    const item = yield tbl_item_1.default.build({ ite_nombre, cat_id });
    item.save();
    res.json({
        msg: `Se creó un nuevo item`,
        dato: [item]
    });
});
exports.postItem = postItem;
const putItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ite_id } = req.params;
    const item = yield tbl_item_1.default.findOne({
        where: {
            ite_id,
            ite_estado: true
        }
    });
    if (!item) {
        return res.status(400).json({
            msg: `No existe el item con el id: ${ite_id}`
        });
    }
    const { ite_nombre, cat_id } = req.body;
    yield item.update({ ite_nombre, cat_id });
    res.json({
        msg: `Se actualizó el item ${ite_id}`,
        dato: [item]
    });
});
exports.putItem = putItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ite_id } = req.params;
    const item = yield tbl_item_1.default.findOne({
        where: {
            ite_id,
            ite_estado: true
        }
    });
    if (!item) {
        return res.status(400).json({
            msg: `No existe el item con el id: ${ite_id}`
        });
    }
    yield item.update({ ite_estado: false });
    res.json({
        msg: `Se eliminó el item ${ite_id}`,
        dato: [item]
    });
});
exports.deleteItem = deleteItem;
//# sourceMappingURL=item.js.map