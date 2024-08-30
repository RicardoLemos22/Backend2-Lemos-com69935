import { request, response } from "express";
import envs from "../config/envs.config.js";

export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        if (!req.user) return res.status(401).json({ status: "Error", msg: "Unauthorized" });

        if (req.user.role != role) return res.status(403).json({ status: "Error", msg: "Forbidden" });

        next();

    };
};
