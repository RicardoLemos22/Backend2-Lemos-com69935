import mongoose from "mongoose";

//aunque Mongo lo registra como "tickets", aca lo asigno en singular
const ticketCollection = "ticket";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);