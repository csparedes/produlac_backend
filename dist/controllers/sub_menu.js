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
exports.deleteSubMenu = exports.putSubMenu = exports.postSubMenu = exports.getSubMenu = exports.getSubMenus = void 0;
const dist_1 = require("sequelize/dist");
const tbl_rol_1 = __importDefault(require("../models/tbl_rol"));
const tbl_submenu_1 = __importDefault(require("../models/tbl_submenu"));
const getSubMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subMenus = yield tbl_submenu_1.default.findAll({
        where: {
            smen_estado: true
        }
    });
    if (!subMenus) {
        return res.status(400).json({
            msg: `No existe ningún submenu en la base de datos`
        });
    }
    res.json({
        msg: `Lista de Submenus`,
        subMenus
    });
});
exports.getSubMenus = getSubMenus;
const getSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smen_id } = req.params;
    const subMenu = yield tbl_rol_1.default.findByPk(smen_id);
    if (!subMenu) {
        return res.status(400), dist_1.json({
            msg: `No existe submenu con el id: ${smen_id}`
        });
    }
    res.json({
        msg: `Muestra de submenu`,
        subMenu
    });
});
exports.getSubMenu = getSubMenu;
const postSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smen_nombre, smen_link, men_id } = req.body;
    const subMenuBuscado = yield tbl_submenu_1.default.findOne({
        where: {
            smen_nombre,
            smen_estado: true
        }
    });
    if (subMenuBuscado) {
        return res.status(400).json({
            msg: `Ya existe el submenu`
        });
    }
    const subMenu = yield tbl_rol_1.default.build({
        smen_nombre,
        smen_link,
        men_id
    });
    subMenu.save();
    res.json({
        msg: `Se creó un nuevo submenu`,
        subMenu
    });
});
exports.postSubMenu = postSubMenu;
const putSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smen_id } = req.params;
    const subMenu = yield tbl_submenu_1.default.findByPk(smen_id);
    if (!subMenu) {
        return res.status(400).json({
            msg: `No existe el submenu de id: ${smen_id}`
        });
    }
    const { smen_nombre, smen_link, men_id } = req.body;
    yield subMenu.update({
        smen_nombre,
        smen_link,
        men_id
    });
    res.json({
        msg: `Se actualizó el submenu de id: ${smen_id}`,
        subMenu
    });
});
exports.putSubMenu = putSubMenu;
const deleteSubMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smen_id } = req.params;
    const subMenu = yield tbl_submenu_1.default.findByPk(smen_id);
    if (!subMenu) {
        return res.status(400).json({
            msg: `No existe el submenu de id: ${smen_id}`
        });
    }
    yield subMenu.update({ smen_estado: false });
    res.json({
        msg: `Se eliminó el submenu de id: ${smen_id}`,
        subMenu
    });
});
exports.deleteSubMenu = deleteSubMenu;
//# sourceMappingURL=sub_menu.js.map