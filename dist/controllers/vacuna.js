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
exports.deleteVacuna = exports.putVacuna = exports.postVacuna = exports.getVacuna = exports.getVacunas = void 0;
const tbl_vacuna_1 = __importDefault(require("../models/tbl_vacuna"));
const getVacunas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vacunas = yield tbl_vacuna_1.default.findAll({
        where: {
            vac_estado: true
        }
    });
    if (!vacunas) {
        return res.status(400).json({
            msg: `No existe ningún dato de vacunas en la base de datos`
        });
    }
    res.json({
        msg: `Listado de vacunas`,
        dato: vacunas
    });
});
exports.getVacunas = getVacunas;
const getVacuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vac_id } = req.params;
    const vacuna = yield tbl_vacuna_1.default.findByPk(vac_id);
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe ninguna vacuna con el id: ${vac_id}`
        });
    }
    res.json({
        msg: `Detalle de Vacuna`,
        dato: [vacuna]
    });
});
exports.getVacuna = getVacuna;
const postVacuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vac_fecha, ani_id, vac_vacuna, vac_enfermedad, vac_descripcion } = req.body;
    const vacuna = yield tbl_vacuna_1.default.build({
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    });
    vacuna.save();
    res.json({
        msg: `Se creó un nuevo registro de vacuna`,
        dato: [vacuna]
    });
});
exports.postVacuna = postVacuna;
const putVacuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vac_id } = req.params;
    const vacuna = yield tbl_vacuna_1.default.findByPk(vac_id);
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe un registro de vacuna con el id: ${vac_id}`
        });
    }
    const { vac_fecha, ani_id, vac_vacuna, vac_enfermedad, vac_descripcion } = req.body;
    yield vacuna.update({
        vac_fecha,
        ani_id,
        vac_vacuna,
        vac_enfermedad,
        vac_descripcion
    });
    res.json({
        msg: `Se actualizó el registro de vacuna con el id: ${vac_id}`,
        dato: [vacuna]
    });
});
exports.putVacuna = putVacuna;
const deleteVacuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vac_id } = req.params;
    const vacuna = yield tbl_vacuna_1.default.findByPk(vac_id);
    if (!vacuna) {
        return res.status(400).json({
            msg: `No existe un registro de vacuna con el id: ${vac_id}`
        });
    }
    yield vacuna.update({ vac_estado: false });
    res.json({
        msg: `Se eliminó el registro de vacuna con el id: ${vac_id}`,
        dato: [vacuna]
    });
});
exports.deleteVacuna = deleteVacuna;
//# sourceMappingURL=vacuna.js.map