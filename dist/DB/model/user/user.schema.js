"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utilities/common/enum");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: function () {
            if (this.userAgent === enum_1.USER_AGENT.Google) {
                return false;
            }
            return true;
        },
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: { type: String, enum: enum_1.SYS_ROLE, default: enum_1.SYS_ROLE.User },
    gender: { type: String, enum: enum_1.GENDER, default: enum_1.GENDER.Male },
    userAgent: { type: String, enum: enum_1.USER_AGENT, default: enum_1.USER_AGENT.Local },
    otp: String,
    otpExpireAt: Date,
    isVerified: { type: Boolean, default: false },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
userSchema
    .virtual("fullName")
    .get(function () {
    return `${this.firstName} ${this.lastName}`;
})
    .set(function (value) {
    this.firstName = value.split(" ")[0];
    this.lastName = value.split(" ")[1];
});
exports.default = userSchema;
