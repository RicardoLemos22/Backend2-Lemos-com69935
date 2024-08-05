import { Router } from "express";
import mongoose from "mongoose"

//FS: comento los q usan JSON
//import cartManager from "../dao/fileSystem/cartManager.js";
//import productManager from "../dao/fileSystem/productManager.js";
import cartDao from "../dao/mongoDB/cart.dao.js";
import productDao from "../dao/mongoDB/product.dao.js";

const router = Router();


//Agrego un nuevo carrito
router.post("/", async (req, res) => {
  try {
    //const cart = await cartManager.createCart();
    const cart = await cartDao.create();
    res.status(200).json({ status: "success", payload: cart });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


//Recupero 1 carrito x su object ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    //const cart = await cartManager.getCartById(Number(cid));

    // Valido que el cid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de carrito proporcionado es inválido." });
    }

    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado." });

    res.status(200).json({ status: "success", payload: cart });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


//Agrego un producto a un carro existente
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    //const product = await productManager.getProductById(Number(pid));

    // Valido que el cid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de carrito proporcionado es inválido" });
    }
    // Valido que el pid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de producto proporcionado es inválido" });
    }

    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "No existe un producto para el ID ingresado" });
    
    //const cart = await cartManager.addProductToCart(Number(cid), Number(pid));
    const cart = await cartDao.addProductToCart(cid, pid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado" });

    res.status(200).json({ status: "success", payload: cart });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


// Elimino un producto de un carro
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    // Valido que el cid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de carrito proporcionado es inválido" });
    }
    // Valido que el pid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de producto proporcionado es inválido" });
    }

    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "No existe un producto para el ID ingresado" });
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado" });

    const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


//Agrego un producto con X cantidad fija, a un carro existente
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body

    // Valido que el cid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de carrito proporcionado es inválido" });
    }
    // Valido que el pid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de producto proporcionado es inválido" });
    }
    
    const product = await productDao.getById(pid);
    if (!product) return res.status(404).json({ status: "Error", msg: "No existe un producto para el ID ingresado" });
    const cart = await cartDao.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado" });

    const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity));

    res.status(200).json({ status: "success", payload: cartUpdate });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


//Elimina todos los productos de un carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    // Valido que el cid sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).json({ status: "Error", msg: "El ID de carrito proporcionado es inválido" });
    }

    const cart = await cartDao.clearProductsToCart(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "El carrito no se ha encontrado" });
    
    res.status(200).json({ status: "success", payload: cart });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Ha ocurrido un error interno del servidor." });
  }
});


export default router;
