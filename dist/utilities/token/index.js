"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dev_config_1 = __importDefault(require("../../env/dev.config"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, dev_config_1.default.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, dev_config_1.default.JWT_SECRET);
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, dev_config_1.default.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, dev_config_1.default.JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
