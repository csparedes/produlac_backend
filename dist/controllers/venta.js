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
exports.deleteVenta = exports.putVenta = exports.postVenta = exports.getVenta = exports.getVentasPorFinca = exports.getVentas = void 0;
const sequelize_1 = require("sequelize");
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const tbl_venta_1 = __importDefault(require("../models/tbl_venta"));
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ventas = yield tbl_venta_1.default.findAll({
        where: {
            ven_estado: true
        },
        include: [
            { model: tbl_animales_1.default },
            { model: tbl_personas_1.default }
        ]
    });
    if (!ventas) {
        return res.status(400).json({
            msg: `No existe ningún registro de ventas`
        });
    }
    res.json({
        msg: `Lista de ventas`,
        dato: ventas
    });
});
exports.getVentas = getVentas;
const getVentasPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fin_id } = req.params;
    const ventas = yield ((_a = tbl_venta_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
    SELECT * FROM tbl_venta
    INNER JOIN tbl_animales A1 on tbl_venta.ani_id=A1.ani_id
    WHERE A1.fin_id=${fin_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!ventas) {
        return res.status(400).json({
            msg: `No existe ningún registro de ventas de la finca: ${fin_id}`
        });
    }
    res.json({
        msg: `Lista de ventas por finca`,
        dato: ventas
    });
});
exports.getVentasPorFinca = getVentasPorFinca;
const getVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ven_id } = req.params;
    const venta = yield tbl_venta_1.default.findByPk(ven_id, {
        include: [
            { model: tbl_animales_1.default },
            { model: tbl_personas_1.default }
        ]
    });
    if (!venta) {
        return res.status(400).json({
            msg: `No existe venta con el id: ${ven_id}`
        });
    }
    res.json({
        msg: `Detalle de Venta`,
        dato: [venta]
    });
});
exports.getVenta = getVenta;
const postVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id, ven_fecha, per_idvendedor, ven_comprador, ven_telcomprador, ven_cedulacomprador, ven_direccioncomprador, ven_valor } = req.body;
    const venta = yield tbl_venta_1.default.build({
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    });
    venta.save();
    res.json({
        msg: `Se creó un nuevo registro de venta`,
        dato: [venta]
    });
});
exports.postVenta = postVenta;
const putVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ven_id } = req.params;
    const venta = yield tbl_venta_1.default.findOne({
        where: {
            ven_id,
            ven_estado: true
        }
    });
    if (!venta) {
        return res.status(400).json({
            msg: `No existe un registro de venta con id: ${ven_id}`
        });
    }
    const { ani_id, ven_fecha, per_idvendedor, ven_comprador, ven_telcomprador, ven_cedulacomprador, ven_direccioncomprador, ven_valor } = req.body;
    yield venta.update({
        ani_id,
        ven_fecha,
        per_idvendedor,
        ven_comprador,
        ven_telcomprador,
        ven_cedulacomprador,
        ven_direccioncomprador,
        ven_valor
    });
    res.json({
        msg: `Se actualizó el registro de venta`,
        dato: [venta]
    });
});
exports.putVenta = putVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ven_id } = req.params;
    const venta = yield tbl_venta_1.default.findOne({
        where: {
            ven_id,
            ven_estado: true
        }
    });
    if (!venta) {
        return res.status(400).json({
            msg: `No existe un registro de venta con id: ${ven_id}`
        });
    }
    yield venta.update({ ven_estado: false });
    res.json({
        msg: `Se eliminó el registro de venta`,
        dato: [venta]
    });
});
exports.deleteVenta = deleteVenta;
//# sourceMappingURL=venta.js.map