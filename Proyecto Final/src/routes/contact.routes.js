import { Router } from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = Router();

router.get("/email", async (req, res) => {
    try {
        const { email, subject, html } = req.body;
        await sendEmail(email, subject, html);

        res.status(200).send("Email sent");

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: envs.ERROR500 });
    }
});

export default router;
