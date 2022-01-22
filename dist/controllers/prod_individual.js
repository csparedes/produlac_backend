"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteProdIndividual = exports.putProdIndividual = exports.postProdIndividuales = exports.postProdIndividualPorFechas = exports.getProdIndividual = exports.getProdIndividuales = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_prodindividual_1 = __importDefault(require("../models/tbl_prodindividual"));
const getProdIndividuales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodIndividuales = yield tbl_prodindividual_1.default.findAll({
        where: {
            pro_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!prodIndividuales) {
        return res.status(400).json({
            msg: `No existe ninguna prodIndividual registrada`
        });
    }
    res.json({
        msg: `Lista de prodIndividuales`,
        dato: prodIndividuales
    });
});
exports.getProdIndividuales = getProdIndividuales;
const getProdIndividual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pro_id } = req.params;
    const prodIndividual = yield tbl_prodindividual_1.default.findOne({
        where: {
            pro_id,
            pro_estado: true
        },
        include: {
            model: tbl_animales_1.default
        }
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe ningún prodIndividual con el id: ${pro_id}`
        });
    }
    res.json({
        msg: `Detalle de prodIndividual`,
        dato: [prodIndividual]
    });
});
exports.getProdIndividual = getProdIndividual;
const postProdIndividualPorFechas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    // const ani_id = req.params.ani_id;
    const { fecha_inicio, fecha_fin } = req.body;
    const prodIndividual = yield tbl_prodindividual_1.default.findAll({
        group: 'pro_fecha',
        // order: ['pro_fecha'],
        attributes: [
            [sequelize_1.default.fn('SUM', sequelize_1.default.col('pro_litros')), 'sum_pro_litros'], 'pro_fecha'
        ],
        where: {
            ani_id,
            pro_fecha: {
                [sequelize_1.Op.lte]: fecha_fin,
                [sequelize_1.Op.gte]: fecha_inicio
            },
            pro_estado: true
        },
        // include: {
        //     model: Animales
        // },
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe ningún prodIndividual con el animal: ${ani_id}`
        });
    }
    res.json({
        msg: `Detalle de prodIndividual`,
        dato: prodIndividual
    });
});
exports.postProdIndividualPorFechas = postProdIndividualPorFechas;
const postProdIndividuales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id, pro_fecha, pro_horario, pro_litros, pro_dieta } = req.body;
    const prodIndividual = yield tbl_prodindividual_1.default.build({
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    });
    prodIndividual.save();
    res.json({
        msg: `Se ha ingresado un nuevo registro de prodIndividual`,
        dato: [prodIndividual]
    });
});
exports.postProdIndividuales = postProdIndividuales;
const putProdIndividual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pro_id } = req.params;
    const prodIndividual = yield tbl_prodindividual_1.default.findOne({
        where: {
            pro_id,
            pro_estado: true
        }
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe registro de prodIndividual de id: ${pro_id}`
        });
    }
    const { ani_id, pro_fecha, pro_horario, pro_litros, pro_dieta } = req.body;
    yield prodIndividual.update({
        ani_id,
        pro_fecha,
        pro_horario,
        pro_litros,
        pro_dieta
    });
    res.json({
        msg: `Se actualizó el registro`,
        dato: [prodIndividual]
    });
});
exports.putProdIndividual = putProdIndividual;
const deleteProdIndividual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pro_id } = req.params;
    const prodIndividual = yield tbl_prodindividual_1.default.findOne({
        where: {
            pro_id,
            pro_estado: true
        }
    });
    if (!prodIndividual) {
        return res.status(400).json({
            msg: `No existe registro de prodIndividual de id: ${pro_id}`
        });
    }
    yield prodIndividual.update({ pro_estado: false });
    res.json({
        msg: `Se eliminó el registro con id: ${pro_id}`,
        dato: [prodIndividual]
    });
});
exports.deleteProdIndividual = deleteProdIndividual;
//# sourceMappingURL=prod_individual.js.map