import { request, response } from "express";
import { verifyToken } from "../utils/jwt.js";
import envs from "../config/envs.config.js";

export const checkToken = async(req = request, res = response, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ status: "Error", msg: "Token not provided" });

        const tokenVerify = verifyToken(token);
        if (!tokenVerify) return res.status(401).json({ status: "Error", msg: "Invalid Token" });

        req.user = verifyToken;

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500 });
    }
};
