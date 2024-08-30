import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//aunque Mongo lo registra como "products", aca lo asigno en singular
const productCollection = "product";

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnail: {
        type: Array,
        default: []
    },
    description2: String
})

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);