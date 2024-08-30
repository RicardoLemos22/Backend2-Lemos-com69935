import mongoose from "mongoose"
import envs from "./envs.config.js";

// Configuración del string de conexión a mi BD llamada: pflemos
export const conectarMongoDB = async() => {
    try {
        mongoose.connect(envs.MONGO_URL);
        console.log("Servidor local conectado al servicio MongoDB");

    } catch (error) {
        // muestro el objeto Error completo para entender que puede fallar
        console.log(`Error: ${error}`);

    }
}