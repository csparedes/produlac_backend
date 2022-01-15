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
exports.deleteMenu = exports.putMenu = exports.postMenu = exports.getMenu = exports.getMenus = void 0;
const tbl_menu_1 = __importDefault(require("../models/tbl_menu"));
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield tbl_menu_1.default.findAll({
        where: {
            men_estado: true
        }
    });
    if (!menus) {
        return res.status(400).json({
            msg: `No hay ningún menú en la base de datos`
        });
    }
    res.json({
        msg: `Lista de menus`,
        dato: menus
    });
});
exports.getMenus = getMenus;
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { men_id } = req.params;
    const menu = yield tbl_menu_1.default.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe menú con el id: ${men_id}`
        });
    }
    res.json({
        msg: `Menú encontrado`,
        dato: [menu]
    });
});
exports.getMenu = getMenu;
const postMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { men_nombre, men_icono, rol_id } = req.body;
    const menuBuscado = yield tbl_menu_1.default.findOne({
        where: {
            men_nombre,
            men_estado: true
        }
    });
    if (menuBuscado) {
        return res.status(400).json({
            msg: `Ya existe ese menú de nombre: ${men_nombre}`
        });
    }
    const menu = yield tbl_menu_1.default.build({ men_nombre, men_icono, rol_id });
    menu.save();
    res.json({
        msg: `Se creó un nuevo menú`,
        dato: [menu]
    });
});
exports.postMenu = postMenu;
const putMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { men_id } = req.params;
    const menu = yield tbl_menu_1.default.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe el menú con el item: ${men_id}`
        });
    }
    const { men_nombre, men_icono, rol_id } = req.body;
    yield menu.update({ men_nombre, men_icono, rol_id });
    res.json({
        msg: `Se actualizó el menu de id: ${men_id}`,
        dato: [menu]
    });
});
exports.putMenu = putMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { men_id } = req.params;
    const menu = yield tbl_menu_1.default.findByPk(men_id);
    if (!menu) {
        return res.status(400).json({
            msg: `No existe el menú con el item: ${men_id}`
        });
    }
    yield menu.update({ men_estado: false });
    res.json({
        msg: `Se eliminó el menu de id: ${men_id}`,
        dato: [menu]
    });
});
exports.deleteMenu = deleteMenu;
//# sourceMappingURL=menu.js.map