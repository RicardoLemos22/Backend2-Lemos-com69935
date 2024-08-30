import fs from "fs";
const pathFile = "./src/";

let productos = [];


const addProduct = async(product) => {
    await getProducts();
    const { title, description, price, thumbnail, code, stock, category } = product;
    const newProduct = {
        id: productos.length + 1,
        title,
        description,
        price,
        thumbnail: thumbnail || [],
        code,
        stock,
        category,
        status: true,
    };

    productos.push(newProduct);

    await fs.promises.writeFile(pathFile, JSON.stringify(productos));

    return product;
};


const getProducts = async(limit) => {
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    const productsParse = JSON.parse(productsJson);
    productos = productsParse || [];

    if (!limit) return productos;

    return productos.slice(0, limit);
};


const getProductById = async(id) => {
    productos = await getProducts();
    const product = productos.find((p) => p.id === id);

    return product;
};


const updateProduct = async(id, productData) => {
    await getProducts();

    const index = productos.findIndex((p) => p.id === id);
    productos[index] = {
        ...productos[index],
        ...productData,
    };

    await fs.promises.writeFile(pathFile, JSON.stringify(productos));
    const product = await getProductById(id);
    return product;
};


const deleteProduct = async(id) => {
    await getProducts();
    const product = await getProductById(id);
    if (!product) return false;
    productos = productos.filter((p) => p.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(productos));

    return true;
};


export default {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};