import dotenv from "dotenv";

dotenv.config();

export default {
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SECRET_CODE: process.env.SECRET_CODE
};