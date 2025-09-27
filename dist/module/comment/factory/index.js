"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
class CommentFactoryService {
    createComment = (createCommentDto, user, post, comment) => {
        const newComment = new entity_1.Comment();
        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.content = createCommentDto.content;
        newComment.parentIds = comment ? [...comment.parentIds, comment._id] : [];
        newComment.reactions = [];
        newComment.mentions = [];
        return newComment;
    };
}
exports.default = CommentFactoryService;
