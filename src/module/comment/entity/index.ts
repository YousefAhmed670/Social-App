import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utilities";

export class Comment {
    userId: ObjectId;
    postId: ObjectId;
    parentIds: ObjectId[];
    content: string;
    attachments: IAttachment[];
    reactions: IReaction[];
    mentions?: ObjectId[];
}