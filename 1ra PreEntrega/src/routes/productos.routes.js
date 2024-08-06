import { Router } from "express";
import { verif_InfoProducto } from "../middlewares/verif_InfoProducto.middleware.js";
//FS: comento los q usan JSON
//import productManager from "../dao/fileSystem/productManager.js";
import productDao from "../dao/mongoDB/product.dao.js";
import envs from "../config/envs.config.js";

const router = Router();

//Recupero todos los productos
router.get("/", async(req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true,
        };

        // Si consultan por categoría
        if (category) {
            const products = await productDao.getAll({ category }, options);
            return res.status(200).json({ status: "success", payload: products });
        }

        if (status) {
            const products = await productDao.getAll({ status }, options);
            return res.status(200).json({ status: "success", payload: products });
        }

        const products = await productDao.getAll({}, options);
        res.status(200).json({ status: "success", payload: products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});


//Recupero 1 producto x su object ID
router.get("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        //const product = await productManager.getProductById(Number(pid));
        const product = await productDao.getById(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});


//Agrego un nuevo producto
router.post("/", verif_InfoProducto, async(req, res) => {
    try {
        const body = req.body;
        //const product = await productManager.addProduct(body);
        const product = await productDao.create(body)

        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});


//Actualizio un producto existente
router.put("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body
            //const product = await productManager.updateProduct(Number(pid), body);
        const product = await productDao.update(pid, body);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});


//Elimino un producto PERO a diferencia de FS que lo borraba de array, aca se le setea el STATUS en false
router.delete("/:pid", async(req, res) => {
    try {
        const { pid } = req.params;
        //const product = await productManager.deleteProduct(Number(pid));
        const product = await productDao.deleteOne(pid);
        if (!product) return res.status(404).json({ status: "Error", msg: "El producto del ID ingresado no se ha encontrado" });

        //res.status(200).json({ status: "OK", msg: `El producto con el ID ${pid} ha sido eliminado` });
        res.status(200).json({ status: "OK", msg: `El producto con el ID ${pid} ha sido desactivado del inventario` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
});


export default router;