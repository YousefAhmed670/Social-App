import { Schema } from "mongoose";
import { IComment } from "../../../utilities";
import { reactionSchema } from "../common";

export const CommentSchema = new Schema<IComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    content: { type: String },
    reactions: [reactionSchema],
  },
  { timestamps: true }
);