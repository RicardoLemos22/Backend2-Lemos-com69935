// import userDao from "../dao/mongoDB/user.dao.js";
// import { createHash, isValidPassword } from "../utils/hashPassword.js";

import passport from "passport";
import { Router } from "express";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import envs from "../config/envs.config.js";

const router = Router();

router.post("/register", passportCall("register"), async(req, res) => {
    try {
        res.status(201).json({ status: "Success", msg: "User created" });

    } catch (error) {
        //console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500 });
    }
});


router.post("/login", passportCall("login"), async(req, res) => {
    try {
        const token = createToken(req.user);

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ status: "Success", payload: req.user });

    } catch (error) {
        //console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500 });
    }
});


router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
        session: false,
    }),

    async(req, res) => {
        try {
            return res.status(200).json({ status: "Success", payload: req.user });

        } catch (error) {
            //console.log(error);
            res.status(500).json({ status: "Error", msg: envs.ERROR500 });

        }
    }
);

router.get("/current", passportCall("current"), async(req, res) => {
    res.status(200).json({ status: "Success", user: req.user });

});

export default router;