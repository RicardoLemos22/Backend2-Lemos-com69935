import { request, response } from "express";
//FS: comento los q usan JSON
//import productManager from "../dao/fileSystem/productManager.js";
import productDao from "../dao/mongoDB/product.dao.js";

// Verifico la información del Producto
export const verif_InfoProducto = async(req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category
        };

        //const products = await productManager.getProducts();
        const products = await productDao.getAll();
        const productExists = products.find((p) => p.code === code);
        if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya se ha agregado.` });

        const checkData = Object.values(newProduct).includes(undefined);
        if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos del producto son de ingreso obligatorio." });

        next(); // continuo a la ejecución de mi endpoint

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
    }
};