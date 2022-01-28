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
exports.deleteProdGlobar = exports.putProdGlobal = exports.postProdGlobal = exports.getProdGlobal = exports.getProdGlobalesPorFincaEditar = exports.postProdGlobalesPorFinca = exports.getProdGlobales = void 0;
const sequelize_1 = require("sequelize");
const tbl_finca_1 = __importDefault(require("../models/tbl_finca"));
const tbl_item_1 = __importDefault(require("../models/tbl_item"));
const tbl_prodglobal_1 = __importDefault(require("../models/tbl_prodglobal"));
const getProdGlobales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodGlobales = yield tbl_prodglobal_1.default.findAll({
        where: {
            pglo_estado: true
        },
        include: [
            { model: tbl_finca_1.default },
            { model: tbl_item_1.default }
        ]
    });
    if (!prodGlobales) {
        return res.status(400).json({
            msg: `No existe ningún registro`
        });
    }
    res.json({
        msg: `Lista de prodGlobales`,
        dato: prodGlobales
    });
});
exports.getProdGlobales = getProdGlobales;
// export const getProdGlobalesPorFinca = async (req: Request, res: Response) => {
//     const { fin_id } = req.params;
//     const prodGlobales = await ProdGlobal.findAll({
//         where: {
//             fin_id,
//             pglo_estado: true
//         },
//         group: 'pglo_fecha',
//         attributes: [
//             [sequelize.fn('SUM',sequelize.col('pglo_litros')),'sum_pglo_litros'], 'pglo_fecha'
//         ]
//     });
//     if (!prodGlobales) {
//         return res.status(400).json({
//             msg: `No existe ningún registro para la finca: ${fin_id}`
//         })
//     }
//     res.json({
//         msg: `Lista de prodGlobales`,
//         dato: prodGlobales
//     });
// }
const postProdGlobalesPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { fin_id, fecha_inicio, fecha_fin } = req.body;
    if (fecha_inicio != "" && fecha_fin != "") {
        const prodGlobales = yield ((_a = tbl_prodglobal_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`SELECT * , SUM(pglo_litros) as sum_pglo_litros FROM tbl_prodglobal
        WHERE pglo_fecha BETWEEN "${fecha_inicio}" and "${fecha_fin}" AND fin_id = ${fin_id}
        GROUP BY pglo_fecha`, { type: sequelize_1.QueryTypes.SELECT }));
        if (!prodGlobales) {
            return res.status(400).json({
                msg: `No existe ningún registro para la finca: ${fin_id}`,
                dato: [],
            });
        }
        res.json({
            msg: `Lista de prodGlobales por fechas`,
            dato: prodGlobales,
        });
    }
    else {
        const prodGlobales = yield ((_b = tbl_prodglobal_1.default.sequelize) === null || _b === void 0 ? void 0 : _b.query(`SELECT * , SUM(pglo_litros) as sum_pglo_litros FROM tbl_prodglobal
        WHERE  fin_id = ${fin_id}
        GROUP BY pglo_fecha`, { type: sequelize_1.QueryTypes.SELECT }));
        if (!prodGlobales) {
            return res.status(400).json({
                msg: `No existe ningún registro para la finca: ${fin_id}`,
                dato: []
            });
        }
        res.json({
            msg: `Lista de prodGlobales`,
            dato: prodGlobales
        });
    }
});
exports.postProdGlobalesPorFinca = postProdGlobalesPorFinca;
const getProdGlobalesPorFincaEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fin_id } = req.params;
    const prodGlobales = yield tbl_prodglobal_1.default.findAll({
        where: {
            fin_id,
            pglo_estado: true
        },
        include: {
            model: tbl_item_1.default
        },
        order: [['pglo_fecha', 'ASC']]
    });
    if (!prodGlobales) {
        return res.status(400).json({
            msg: `No existe ningún registro para la finca: ${fin_id}`
        });
    }
    res.json({
        msg: `Lista de prodGlobales`,
        dato: prodGlobales
    });
});
exports.getProdGlobalesPorFincaEditar = getProdGlobalesPorFincaEditar;
const getProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        },
        include: [
            { model: tbl_finca_1.default },
            { model: tbl_item_1.default }
        ]
    });
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No existe ningún prodGlobal con el id: ${pglo_id}`
        });
    }
    res.json({
        msg: `Detalle de prodGlobar`,
        dato: [prodGlobal]
    });
});
exports.getProdGlobal = getProdGlobal;
const postProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_fecha, ite_idhorario, pglo_litros, pglo_numvacas, fin_id } = req.body;
    const prodGlobal = yield tbl_prodglobal_1.default.build({
        pglo_fecha,
        ite_idhorario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    prodGlobal.save();
    res.json({
        msg: `Se agregó un nuevo registro`,
        dato: [prodGlobal]
    });
});
exports.postProdGlobal = postProdGlobal;
const putProdGlobal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        }
    });
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    const { pglo_fecha, ite_idhorario, pglo_litros, pglo_numvacas, fin_id } = req.body;
    yield prodGlobal.update({
        pglo_fecha,
        ite_idhorario,
        pglo_litros,
        pglo_numvacas,
        fin_id
    });
    res.json({
        msg: `Se actualizó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
});
exports.putProdGlobal = putProdGlobal;
const deleteProdGlobar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pglo_id } = req.params;
    const prodGlobal = yield tbl_prodglobal_1.default.findOne({
        where: {
            pglo_id,
            pglo_estado: true
        }
    });
    if (!prodGlobal) {
        return res.status(400).json({
            msg: `No se encontró el registro con el id: ${pglo_id}`
        });
    }
    yield prodGlobal.update({ pglo_estado: false });
    res.json({
        msg: `Se eliminó el registro de la prodGlobal`,
        dato: [prodGlobal]
    });
});
exports.deleteProdGlobar = deleteProdGlobar;
//# sourceMappingURL=prod_global.js.map