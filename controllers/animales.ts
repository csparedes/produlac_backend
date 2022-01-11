import { Request, Response } from "express";
import Animales from '../models/tbl_animales';

export const getAnimales = async (req: Request, res: Response) => {
    const animales = await Animales.findAll({
        where: {
            ani_estado: true
        }
    });

    if (!animales) {
        return res.status(500)
    }
}