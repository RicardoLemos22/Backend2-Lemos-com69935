import {Router} from "express";
import productosRouter from "./productos.routes.js";
import carrosRouter from "./carrito.routes.js";

const router = Router();

router.use("/products", productosRouter);
router.use("/carts", carrosRouter);

export default router;
