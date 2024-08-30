import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";
import { request, response } from "express";
import envs from "../config/envs.config.js";

const createCart = async(req, res) => {
    try {
        const cart = await cartServices.createCart();
        res.status(201).json({ status: "Success", payload: cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const getCartById = async(req = request, res = response) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);

        if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado." });
        res.status(200).json({ status: "Success", payload: cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const addProductToCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartServices.addProductToCart(cid, pid);
        res.status(200).json({ status: "Success", payload: cartUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const deleteProductToCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const cartUpdate = await cartServices.deleteProductToCart(cid, pid);
        res.status(200).json({ status: "Success", payload: cartUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const updateQuantityProductInCart = async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));

        res.status(200).json({ status: "Success", payload: cartUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const clearProductsToCart = async(req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.clearProductsToCart(cid);

        if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado." });
        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

const purchaseCart = async(req = request, res = response) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);

        if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado." });

        const total = await cartServices.purchaseCart(cid);
        const ticket = await ticketServices.createTicket(req.user.email, total);

        res.status(200).json({ status: "Success", payload: ticket });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500ESP });
    }
};

export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
    purchaseCart,
};