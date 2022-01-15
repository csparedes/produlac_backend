import { Request, Response } from "express";
import Animales from '../models/tbl_animales';
import Especie from "../models/tbl_especies";
import Finca from "../models/tbl_finca";
import Item from "../models/tbl_item";

export const getAnimales = async (req: Request, res: Response) => {
    const animales = await Animales.findAll({
        where: {
            ani_estado: true
        },
        include: [
            { model: Finca },
            { model: Item },
            { model: Especie}
        ]
            
        
    });

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

export const getAnimal = async (req: Request, res: Response) => {
    const { ani_codigo } = req.params;
    const animal = await Animales.findOne({
        where: {
            ani_codigo,
            ani_estado: true,
        },
        include: [
            { model: Finca },
            { model: Item },
            { model: Especie}
        ]
    });

    if (!animal) {
        return res.status(400).json({
            msg: `No existe el animalito con el código: ${ani_codigo}`
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
        ani_etapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecieanimal,
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
        ite_idespecieanimal,
        fin_id,
        ite_idtipoestado
    };

    const animal = await Animales.build(nuevoAnimal);
    animal.save();
    res.json({
        msg: `Se ha ingresado un nuevo animal`,
        dato: [animal]
    })

}

export const putAnimal = async (req: Request, res: Response) => {
    const { ani_codigo_url } = req.params;
    const animalActual = await Animales.findOne({
        where: {
            ani_codigo: ani_codigo_url,
            ani_estado: true
        }
    });

    if (!animalActual) {
        return res.status(400).json({
            msg: `El animal con el codigo ${ani_codigo_url} no existe en esta base de datos`
        });
    }

    const {
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
        ite_idespecieanimal,
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
        ani_etapa,
        ani_idpadre,
        ani_idmadre,
        ani_pesonacer,
        ite_idespecieanimal,
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
    const { ani_codigo } = req.params;
    const animal = await Animales.findOne({
        where: {
            ani_codigo,
            ani_estado: true
        }
    });

    if (!animal) {
        return res.status(400).json({
            msg: `No existe un animal con el código: ${ani_codigo}`
        });
    }

    await animal.update({ ani_estado: false });
    res.json({
        msg: `El animal con código ${ani_codigo} ha sido eliminado`,
        dato: [animal]
    });
}