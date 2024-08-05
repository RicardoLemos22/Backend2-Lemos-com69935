import mongoose from "mongoose";

//aunque Mongo lo registra como "carts", aca lo asigno en singular
const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ 
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, 
      quantity: Number 
    }],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
