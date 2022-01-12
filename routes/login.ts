import { Router } from "express";
import { postLogin } from "../controllers/login";
import validarCampos from "../middlewares/validar_campos";

const router = Router();

router.post('/', [validarCampos], postLogin);

export default router;