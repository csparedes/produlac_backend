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
exports.deleteAnimal = exports.putAnimal = exports.postAnimal = exports.getAnimal = exports.getAnimales = void 0;
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_especies_1 = __importDefault(require("../models/tbl_especies"));
const tbl_finca_1 = __importDefault(require("../models/tbl_finca"));
const tbl_item_1 = __importDefault(require("../models/tbl_item"));
const getAnimales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animales = yield tbl_animales_1.default.findAll({
        where: {
            ani_estado: true
        },
        include: [
            { model: tbl_finca_1.default },
            { model: tbl_item_1.default },
            { model: tbl_especies_1.default }
        ]
    });
    if (!animales) {
        return res.status(400).json({
            msg: `No existen animales en la base de datos`
        });
    }
    res.json({
        msg: "Lista de animales",
        dato: animales
    });
});
exports.getAnimales = getAnimales;
const getAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    const animal = yield tbl_animales_1.default.findOne({
        where: {
            ani_id,
            ani_estado: true,
        },
        include: [
            { model: tbl_finca_1.default },
            { model: tbl_item_1.default },
            { model: tbl_especies_1.default }
        ]
    });
    if (!animal) {
        return res.status(400).json({
            msg: `No existe el animalito con el id: ${ani_id}`
        });
    }
    res.json({
        msg: `Se encontró al animal`,
        dato: [animal]
    });
});
exports.getAnimal = getAnimal;
const postAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_codigo, ani_nombre, ani_sexo, ani_fechanacimiento, ani_imagen, ani_raza, ani_etapa, ani_idpadre, ani_idmadre, ani_pesonacer, esp_id, fin_id, ite_idtipoestado } = req.body;
    const animalBuscado = yield tbl_animales_1.default.findOne({
        where: {
            ani_codigo,
            ani_nombre,
            ani_estado: true
        },
    });
    if (animalBuscado) {
        return res.status(400).json({
            msg: `El animal ${ani_nombre}, ya existe en sistema`
        });
    }
    const nuevoAnimal = {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ani_etapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        esp_id,
        fin_id,
        ite_idtipoestado
    };
    const animal = yield tbl_animales_1.default.build(nuevoAnimal);
    animal.save();
    res.json({
        msg: `Se ha ingresado un nuevo animal`,
        dato: [animal]
    });
});
exports.postAnimal = postAnimal;
const putAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    const animalActual = yield tbl_animales_1.default.findOne({
        where: {
            ani_id,
            ani_estado: true
        }
    });
    if (!animalActual) {
        return res.status(400).json({
            msg: `El animal con el id: ${ani_id} no existe en esta base de datos`
        });
    }
    const { ani_codigo, ani_nombre, ani_sexo, ani_fechanacimiento, ani_imagen, ani_raza, ani_etapa, ani_idpadre, ani_idmadre, ani_pesonacer, esp_id, fin_id, ite_idtipoestado } = req.body;
    const nuevoAnimal = {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ani_etapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        esp_id,
        fin_id,
        ite_idtipoestado
    };
    yield animalActual.update(nuevoAnimal);
    res.json({
        msg: `Se actualizó los datos del animal ${ani_nombre}, de código ${ani_codigo}`,
        dato: [nuevoAnimal]
    });
});
exports.putAnimal = putAnimal;
const deleteAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ani_id } = req.params;
    const animal = yield tbl_animales_1.default.findOne({
        where: {
            ani_id,
            ani_estado: true
        }
    });
    if (!animal) {
        return res.status(400).json({
            msg: `No existe un animal con el código: ${ani_id}`
        });
    }
    yield animal.update({ ani_estado: false });
    res.json({
        msg: `El animal con id: ${ani_id} ha sido eliminado`,
        dato: [animal]
    });
});
exports.deleteAnimal = deleteAnimal;
//# sourceMappingURL=animales.js.map