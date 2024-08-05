import fs from "fs";
const pathFile = "./data/carrito.json";

let carro = [];


const getCarts = async() => {
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    const cartsPars = JSON.parse(cartsJson);
    carro = cartsPars || [];
};


const createCart = async() => {
    await getCarts();
    const newCart = {
        id: carro.length + 1,
        products: [],
    };

    carro.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carro));
    return newCart;
};


const getCartById = async(cid) => {
    await getCarts();
    const cart = carro.find((c) => c.id === cid);
    return cart;
};


const addProductToCart = async(cid, pid) => {
    await getCarts();
    const index = carro.findIndex((cart) => cart.id === cid);
    const cart = carro[index];

    // Busco el producto dentro del carrito
    const productIndex = cart.products.findIndex((product) => product.product === pid);

    if (productIndex !== -1) {
        // lo encontre entonces ++1
        cart.products[productIndex].quantity += 1;

    } else {
        // no existe entonces lo agrego
        const product = {
            product: pid,
            quantity: 1,
        };

        cart.products.push(product);
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(carro));

    return cart;
};


export default {
    getCarts,
    getCartById,
    addProductToCart,
    createCart,
};