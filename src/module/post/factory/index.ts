import { IUser } from "../../../utilities";
import { Post } from "../entity";
import { createPostDto, updatePostDto } from "../post.dto";
import { ObjectId } from "mongoose";

export default class PostFactoryService {
    createPost = (createPostDto: createPostDto, user: IUser) => {
        const newPost = new Post()
        newPost.userId = user._id as unknown as ObjectId
        newPost.content = createPostDto.content
        newPost.reactions = []
        newPost.attachments = []
        return newPost
    }
    updatePost = (updatePostDto: updatePostDto, post: Post) => {
        if (updatePostDto.content) {
            post.content = updatePostDto.content
        }
        if (updatePostDto.attachments) {
            post.attachments = []
        }
        return post
    }
}
    