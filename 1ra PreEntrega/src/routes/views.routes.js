import { Router } from "express";
import productManager from "../dao/fileSystem/productManager.js";
import { io } from "../app.js";

const router = Router();

// render del Home >> http://localhost:8080/
router.get("/", async(req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


// render de realtimeproducts >> http://localhost:8080/realtimeproducts
router.get("/realtimeproducts", async(req, res) => {
    try {
        res.render("realTimeProducts");

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


// render de realtimeproducts ADD >> http://localhost:8080/realtimeproducts
router.post("/realtimeproducts", async(req, res) => {
    try {
        const { title, description, price } = req.body;
        await productManager.addProduct({ title, description, price });
        const products = await productManager.getProducts();

        io.emit("products", products);

        res.render("realTimeProducts");

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


// render de realtimeproducts DEL >> http://localhost:8080/realtimeproducts
router.delete("/realtimeproducts", async(req, res) => {
    try {
        const { id } = req.body;
        await productManager.deleteProduct(Number(id));
        const products = await productManager.getProducts();

        io.emit("products", products);

        res.render("realTimeProducts");

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
});


export default router;