import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Animales from '../models/tbl_animales';
import Especie from "../models/tbl_especies";
import Finca from "../models/tbl_finca";
import Item from "../models/tbl_item";

export const getAnimales = async (req: Request, res: Response) => {
    const animales = await Animales.sequelize?.query(`
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
    `,
    { type: QueryTypes.SELECT })

    if (!animales) {
        return res.status(400).json({
            msg: `No existen animales en la base de datos`
        })
    }

    res.json({
        msg: "Lista de animales",
        dato: animales
    })
}

export const getAnimalesPorFinca = async (req: Request, res: Response) => {
    const { fin_id } = req.params;
    const animales = await Animales.sequelize?.query(`
    SELECT tbl_animales.*, 
    D.ani_id as ani_id_padre,
    D.ani_nombre as ani_id_padre_nombre,
    D.ani_imagen as ani_id_padre_imagen,
    D.ani_codigo as ani_id_padre_codigo,
    E.ani_id as ani_id_madre,
    E.ani_nombre as ani_id_madre_nombre,
    E.ani_imagen as ani_id_madre_imagen,
    E.ani_codigo as ani_id_madre_codigo,
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
    `,
    { type: QueryTypes.SELECT })

    if (!animales) {
        return res.status(400).json({
            msg: `No existen animales en la base de datos`
        })
    }

    res.json({
        msg: "Lista de animales",
        dato: animales
    })
}

export const getAnimalesMuertosVivos = async (req: Request, res: Response) => {
    const animales = await Animales.findAll();

    if (!animales) {
        return res.status(400).json({
            msg: `No existe ningún registro de animales`
        })
    }

    res.json({
        msg: `Listado de todos los animales vivos y muertos`,
        dato: animales
    })
}


export const getAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const animal = await Animales.findOne({
        where: {
            ani_id,
            ani_estado: true,
        },
        include: [
            { model: Finca },
            { model: Item },
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
    })
}

export const postAnimal = async (req: Request, res: Response) => {
    const {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ite_idetapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecie,
        fin_id,
        ite_idtipoestado
    } = req.body;

    const animalBuscado = await Animales.findOne({
        where: {
            ani_codigo,
            ani_nombre,
            ani_estado: true
        },
        
    });
    const nuevoAnimal = {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ite_idetapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecie,
        fin_id,
        ite_idtipoestado
    };

    const animal = await Animales.build(nuevoAnimal);
    await animal.save();

    if (ani_idmadre == ' ' || ani_idpadre == ' ') {
        const animalEncontrado = await Animales.findOne({
            where: {
                ani_codigo,
                ani_nombre,
                ani_sexo,
                ani_raza,
                ite_idetapa,
                ani_pesonacer,
                ite_idespecie,
                fin_id,
                ite_idtipoestado
            }
        });
        
        if (!animalEncontrado) {
            return res.status(400).json({
                msg: `No se encontro el animal que se acabó de crear`
            })
        }
        //@ts-ignore
        await animalEncontrado.update({ ani_idpadre: animalEncontrado['ani_id'], ani_idmadre: animalEncontrado['ani_id'] });
        
        
    }


    res.json({
        msg: `Se ha ingresado un nuevo animal`,
        dato: [animal]
    })

}

export const putAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const animalActual = await Animales.findOne({
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

    const {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ite_idetapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecie,
        fin_id,
        ite_idtipoestado
    } = req.body;
    
    const nuevoAnimal = {
        ani_codigo,
        ani_nombre,
        ani_sexo,
        ani_fechanacimiento,
        ani_imagen,
        ani_raza,
        ite_idetapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecie,
        fin_id,
        ite_idtipoestado
    };

    await animalActual.update(nuevoAnimal);
    res.json({
        msg: `Se actualizó los datos del animal ${ani_nombre}, de código ${ani_codigo}`,
        dato: [nuevoAnimal]
    });


}

export const deleteAnimal = async (req: Request, res: Response) => {
    const { ani_id } = req.params;
    const animal = await Animales.findOne({
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

    await animal.update({ ani_estado: false });
    res.json({
        msg: `El animal con id: ${ani_id} ha sido eliminado`,
        dato: [animal]
    });
}