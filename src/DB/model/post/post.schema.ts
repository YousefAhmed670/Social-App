import { Schema } from "mongoose";
import * as utilities from "../../../utilities";
import { reactionSchema } from "../common";
export const PostSchema = new Schema<utilities.IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
    reactions: [reactionSchema],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});
