import nodemailer from "nodemailer";
import envsConfig from "../config/envs.config.js";
import __dirname from "../dirname.js";

//export const sendEmail = async (email, subject, message, html) => {'
export const sendEmail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: envsConfig.GMAIL_EMAIL,
            pass: envsConfig.GMAIL_PASS,
        },
        headers: {
            priority: "high"
        },
    });

    await transporter.sendMail({
        from: envsConfig.GMAIL_EMAIL,
        to: email,
        subject: subject,
        html: html
        //, text: message,
        // attachments: [
        //     {
        //         filename: "gatito.jpg",
        //         path: __dirname + "/public/images/gatito.jpg",
        //         cid: "gatito",
        //     },
        // ],
    });
};
