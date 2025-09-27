"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../entity");
class PostFactoryService {
    createPost = (createPostDto, user) => {
        const newPost = new entity_1.Post();
        newPost.userId = user._id;
        newPost.content = createPostDto.content;
        newPost.reactions = [];
        newPost.attachments = [];
        return newPost;
    };
    updatePost = (updatePostDto, post) => {
        if (updatePostDto.content) {
            post.content = updatePostDto.content;
        }
        if (updatePostDto.attachments) {
            post.attachments = [];
        }
        return post;
    };
}
exports.default = PostFactoryService;
