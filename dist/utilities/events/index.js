"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventEmitter = void 0;
const events_1 = __importDefault(require("events"));
const mail_1 = require("../mail");
exports.eventEmitter = new events_1.default();
exports.eventEmitter.on("userRegistered", async ({ email, otp }) => {
    await (0, mail_1.sendMail)({
        to: email,
        subject: "register OTP",
        html: `<h2>your OTP is:</h2>
        <h1>${otp}</h1>
        <p>OTP will expire in 10 minutes</p>`,
    });
});
exports.eventEmitter.on("sendOTP", async ({ email, otp }) => {
    await (0, mail_1.sendMail)({
        to: email,
        subject: "send OTP",
        html: `<h2>your OTP is:</h2>
        <h1>${otp}</h1>
        <p>OTP will expire in 10 minutes</p>`,
    });
});
