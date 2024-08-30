import { cartModel } from "./models/cart.model.js";

//Agrego un nuevo carrito
const create = async () => {
  const cart = await cartModel.create({});
  return cart;
};

//Recupero 1 carrito x su object ID
const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};

//Agrego un producto a un carro existente
const addProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);
  
  //Busco si ya existe un product le incremento la cant
  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    //sino existe lo agrego con cant=1
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();
  return cart;
};

//Elimino un carro de la colección de MongoDB
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

// Elimino un producto de un carro
const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);
  cart.products = cart.products.filter((element) => element.product != pid);
  await cart.save();
  return cart;
};

//Agrego un producto con X cantidad fija, a un carro existente
const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findById(cid);
  const product = cart.products.find(element => element.product == pid);
  
  if (product) {
    product.quantity = quantity;
    
  } else {
    //sino existe lo agrego con cant=quantity
    cart.products.push({ product: pid, quantity });
  }
  
  await cart.save();
  return cart;
}


//Elimina todos los productos de un carrito
const clearProductsToCart = async (cid) => {
  const cart = await cartModel.findById(cid);
  cart.products = []
  await cart.save()
  return cart;
}


//Recupero todos los carritos 
const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};
//Actualizio un carro existente
const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};


export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart
};
