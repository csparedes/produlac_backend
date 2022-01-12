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
exports.getItem = exports.getItems = void 0;
const tbl_item_1 = __importDefault(require("../models/tbl_item"));
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield tbl_item_1.default.findAll({
        where: {
            ite_estado: true
        }
    });
    if (!items) {
        return res.status(400).json({
            msg: `No existe la lista de items`
        });
    }
    res.json({
        msg: `Lista de Items`,
        items
    });
});
exports.getItems = getItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ite_id } = req.params;
    const item = yield tbl_item_1.default.findByPk(ite_id);
    if (!item) {
        return res.status(400).json({
            msg: ` No se encontró ningún detalle de item`
        });
    }
    res.json({
        msg: `Detalle de Item`,
        item
    });
});
exports.getItem = getItem;
//# sourceMappingURL=item.js.map