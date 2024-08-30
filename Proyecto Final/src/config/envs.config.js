import dotenv from "dotenv";

dotenv.config();

export default {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    SECRET_CODE: process.env.SECRET_CODE,
    ERROR500: "Internal Server Error",
    ERROR500ESP: "Ha ocurrido un error interno del servidor."

};