"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
exports.PostSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        // required: function () {
        //   if (this.attachments?.length) return false;
        //   return true;
        // },
        trim: true,
    },
    reactions: [common_1.reactionSchema],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
});
