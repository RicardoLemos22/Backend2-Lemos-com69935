import express from "express";
import rutas from "./routes/index.routes.js";
import __dirname from "./dirname.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";

//FS desactivo
//import productManager from "./dao/fileSystem/productManager.js";
import { conectarMongoDB } from "./config/mongoDB.config.js";

//Backend2 - 1ra entrega
import envs from "./config/envs.config.js";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();

conectarMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//Backend1 - 2da entrega
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
    session({
        secret: envs.SECRET_CODE, // palabra secreta
        resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
        saveUninitialized: true, // Guarda la session
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//mis Rutas
app.use("/api", rutas);


//mis Vistas
app.use("/", viewsRoutes);


const httpServer = app.listen(envs.PORT, () => {
    console.log(`El servidor ahora esta escuchando en el puerto ${envs.PORT}`);
});


//configuro el Socket
export const io = new Server(httpServer);


io.on("connection", async socket => {
    console.log("Un nuevo usuario se ha conectado al servidor");
    //FS desactivo
    // const products = await productManager.getProducts();
    // io.emit("products", products);
});