"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utilities_1 = require("../../utilities");
const react_provider_1 = require("../../utilities/common/provider/react.provider");
const factory_1 = __importDefault(require("./factory"));
class CommentService {
    postRepository = new DB_1.PostRepository();
    commentRepository = new DB_1.CommentRepository();
    commentFactoryService = new factory_1.default();
    constructor() { }
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDto = req.body;
        const postExists = await this.postRepository.exists({ _id: postId });
        if (!postExists) {
            throw new utilities_1.NotFoundException("Post not found");
        }
        let commentExists;
        if (id) {
            commentExists = await this.commentRepository.exists({ _id: id });
            if (!commentExists) {
                throw new utilities_1.NotFoundException("Comment not found");
            }
        }
        const comment = this.commentFactoryService.createComment(createCommentDto, req.user, postExists, commentExists);
        const createdComment = await this.commentRepository.create(comment);
        res.status(201).json({
            message: "Comment created successfully",
            success: true,
            data: { createdComment },
        });
    };
    react = async (req, res) => {
        const userId = req.user._id;
        const { id } = req.params;
        const { reaction } = req.body;
        await (0, react_provider_1.ReactProvider)(this.commentRepository, id, reaction, userId.toString(), "Comment");
        return res.sendStatus(204);
    };
}
exports.default = new CommentService();
