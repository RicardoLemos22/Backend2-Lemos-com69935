// Importo librerías
import passport from "passport";
import google from "passport-google-oauth20";
import jwt from "passport-jwt";
import local from "passport-local";
import passportCustom from "passport-custom";

// Importo estrutura de datos
import cartDao from "../dao/mongoDB/cart.dao.js";
import userDao from "../dao/mongoDB/user.dao.js";

// Importo funciones de repositorio
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { verifyToken } from "../utils/jwt.js";

// Importo variables de entorno globales
import envs from "./envs.config.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const CustomStrategy = passportCustom.Strategy;


// creo estrategia REGISTRAR
export const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async(req, username, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                const user = await userDao.getByEmail(username);

                if (user) return done(null, false, { message: "User already exists" });

                const cart = await cartDao.create();

                const newUser = {
                    first_name,
                    last_name,
                    password: createHash(password),
                    email: username,
                    age,
                    cart: cart._id
                };

                const userCreate = await userDao.create(newUser);

                return done(null, userCreate);

            } catch (error) {
                return done(error);
            }
        })
    );


    // creo estrategia LOGIN
    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" }, async(username, password, done) => {
            try {
                const user = await userDao.getByEmail(username);

                if (!user || !isValidPassword(user.password, password)) return done(null, false, { message: "User or email invalid" });

                return done(null, user);

            } catch (error) {
                done(error);
            }
        })
    );


    // creo estrategia GOOGLE
    passport.use(
        "google",
        new GoogleStrategy({
                clientID: envs.GOOGLE_CLIENT_ID,
                clientSecret: envs.GOOGLE_CLIENT_SECRET,
                callbackURL: `http://localhost:${envs.PORT}/api/session/google`,
            },
            async(accessToken, refreshToken, profile, cb) => {
                try {
                    const { name, emails } = profile;
                    const user = await userDao.getByEmail(emails[0].value);

                    if (user) {
                        return cb(null, user);

                    } else {
                        const newUser = {
                            first_name: name.givenName,
                            last_name: name && name.familyName ? name.familyName : ' ',
                            email: emails[0].value,
                        };

                        const userCreate = await userDao.create(newUser);
                        return cb(null, userCreate);

                    }
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );


    // creo estrategia Json Web Token
    passport.use(
        "jwt",
        new JWTStrategy({ jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envs.JWT_SECRET_CODE },
            async(jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);

                } catch (error) {
                    return done(error);
                }
            }
        )
    )


    passport.use(
        "current",
        new CustomStrategy(
            async(req, done) => {
                try {
                    const token = cookieExtractor(req);
                    if (!token) return done(null, false);

                    const tokenVerify = verifyToken(token);
                    if (!tokenVerify) return done(null, false);

                    const user = await userDao.getByEmail(tokenVerify.email)
                    done(null, user);

                } catch (error) {
                    done(error)
                }
            }
        )
    )


    // Serialización y deserialización de usuarios
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await userDao.getById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};