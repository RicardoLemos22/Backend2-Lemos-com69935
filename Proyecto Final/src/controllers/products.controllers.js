import { request, response } from "express";
import productServices from "../services/product.services.js";
import envs from "../config/envs.config.js";


const getAllProducts = async(req = request, res = response) => {
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

        // Si nos solicitan por categoría
        if (category) {
            const products = await productServices.getAllProducts({ category }, options);
            return res.status(200).json({ status: "Success", payload: products });
        }

        if (status) {
            const products = await productServices.getAllProducts({ status }, options);
            return res.status(200).json({ status: "Success", payload: products });
        }

        const products = await productServices.getAllProducts({}, options);
        res.status(200).json({ status: "Success", payload: products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};


const getProductById = async(req = request, res = response) => {
    try {
        const { pid } = req.params;
        const product = await productServices.getProductById(pid);

        if (!product) return res.status(404).json({ status: "Error", msg: "El producto no se ha encontrado." });
        res.status(200).json({ status: "Success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};


const updateProduct = async(req = request, res = response) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productServices.updateProduct(pid, productData);

        if (!product) return res.status(404).json({ status: "Error", msg: "El producto no se ha encontrado." });
        res.status(200).json({ status: "Success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};


const createProduct = async(req = request, res = response) => {
    try {
        const productData = req.body;
        const product = await productServices.createProduct(productData);

        res.status(201).json({ status: "Success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await productServices.deleteProduct(pid);

        if (!product) return res.status(404).json({ status: "Error", msg: "El producto no se ha encontrado." });

        res.status(200).json({ status: "Success", msg: `El producto con el id ${pid} ha sido eliminado` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};