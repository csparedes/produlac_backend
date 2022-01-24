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
exports.deleteAnimal = exports.putAnimal = exports.postAnimal = exports.getAnimal = exports.getAnimalesPorFinca = exports.getAnimales = void 0;
const sequelize_1 = require("sequelize");
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_finca_1 = __importDefault(require("../models/tbl_finca"));
const tbl_item_1 = __importDefault(require("../models/tbl_item"));
const getAnimales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const animales = yield ((_a = tbl_animales_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
    SELECT tbl_animales.*, 
    D.ani_id as ani_id_padre,
    D.ani_nombre as ani_id_padre_nombre,
    D.ani_imagen as ani_id_padre_imagen,
    E.ani_id as ani_id_madre,
    E.ani_nombre as ani_id_madre_nombre,
    E.ani_imagen as ani_id_madre_imagen,
    F.*,
    A.ite_id as ite_id_especie,
    A.ite_nombre as ite_id_nombre_especie,
    B.ite_id as ite_id_etapa,
    B.ite_nombre as ite_id_nombre_etapa,
    C.ite_id as ite_id_tipo_estado,
    C.ite_nombre as ite_id_tipo_estado_nombre
    FROM tbl_animales
    INNER JOIN tbl_item A on tbl_animales.ite_idespecie = A.ite_id 
    INNER JOIN tbl_item B on tbl_animales.ite_idetapa = B.ite_id
    INNER JOIN tbl_item C on tbl_animales.ite_idtipoestado = C.ite_id
    INNER JOIN tbl_animales D on tbl_animales.ani_idpadre = D.ani_id
    INNER JOIN tbl_animales E on tbl_animales.ani_idmadre = E.ani_id
    INNER JOIN tbl_finca F on tbl_animales.fin_id = F.fin_id
    WHERE tbl_animales.ani_estado = true
    `, { type: sequelize_1.QueryTypes.SELECT }));
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
const getAnimalesPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { fin_id } = req.params;
    const animales = yield ((_b = tbl_animales_1.default.sequelize) === null || _b === void 0 ? void 0 : _b.query(`
    SELECT tbl_animales.*, 
    D.ani_id as ani_id_padre,
    D.ani_nombre as ani_id_padre_nombre,
    D.ani_imagen as ani_id_padre_imagen,
    E.ani_id as ani_id_madre,
    E.ani_nombre as ani_id_madre_nombre,
    E.ani_imagen as ani_id_madre_imagen,
    F.*,
    A.ite_id as ite_id_especie,
    A.ite_nombre as ite_id_nombre_especie,
    B.ite_id as ite_id_etapa,
    B.ite_nombre as ite_id_nombre_etapa,
    C.ite_id as ite_id_tipo_estado,
    C.ite_nombre as ite_id_tipo_estado_nombre
    FROM tbl_animales
    INNER JOIN tbl_item A on tbl_animales.ite_idespecie = A.ite_id 
    INNER JOIN tbl_item B on tbl_animales.ite_idetapa = B.ite_id
    INNER JOIN tbl_item C on tbl_animales.ite_idtipoestado = C.ite_id
    INNER JOIN tbl_animales D on tbl_animales.ani_idpadre = D.ani_id
    INNER JOIN tbl_animales E on tbl_animales.ani_idmadre = E.ani_id
    INNER JOIN tbl_finca F on tbl_animales.fin_id = F.fin_id
    WHERE F.fin_id = ${fin_id} AND tbl_animales.ani_estado = true
    `, { type: sequelize_1.QueryTypes.SELECT }));
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
exports.getAnimalesPorFinca = getAnimalesPorFinca;
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
    const { ani_codigo, ani_nombre, ani_sexo, ani_fechanacimiento, ani_imagen, ani_raza, ani_etapa, ani_idpadre, ani_idmadre, ani_pesonacer, ite_idespecie, fin_id, ite_idtipoestado } = req.body;
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
        ite_idespecie,
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
    const { ani_codigo, ani_nombre, ani_sexo, ani_fechanacimiento, ani_imagen, ani_raza, ani_etapa, ani_idpadre, ani_idmadre, ani_pesonacer, ite_idespecie, fin_id, ite_idtipoestado } = req.body;
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
        ite_idespecie,
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