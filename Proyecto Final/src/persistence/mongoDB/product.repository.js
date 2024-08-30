import { productModel } from "../models/product.model.js";

//Recupero todos los productos
const getAll = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

//Recupero 1 producto x su object ID
const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

//Agrego un nuevo producto
const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

//Actualizio un producto existente
const update = async (id, data) => {
  const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
  return productUpdate;
};

//Elimino un producto PERO a diferencia de FS que lo borraba de array, aca se le setea el STATUS en false
const deleteOne = async (id) => {
  const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
  return product;
};


export default {
  getAll,
  getById,
  create,
  update,
  deleteOne
}
