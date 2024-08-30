import { Router } from "express";
import productosRouter from "./productos.routes.js";
import carrosRouter from "./carrito.routes.js";
import sessionRouter from "./session.routes.js"
import envs from "../config/envs.config.js";

const router = Router();

router.use("/products", productosRouter);
router.use("/carts", carrosRouter);
router.use("/session", sessionRouter)

router.get("*", async(req, res) => {
    try {
        res.status(404).json({ status: "Error", msg: "Ruta no encontrada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});

export default router;