import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import { NotFoundException, UnauthorizedException } from "../../utilities";
import { ReactProvider } from "../../utilities/common/provider/react.provider";
import PostFactoryService from "./factory";
import { createPostDto } from "./post.dto";

class PostService {
  private readonly postRepository = new PostRepository();
  private readonly postFactoryService = new PostFactoryService();
  constructor() {}

  create = async (req: Request, res: Response) => {
    const createPostDto: createPostDto = req.body;
    const user = req.user;
    const post = this.postFactoryService.createPost(createPostDto, user);
    const createdPost = await this.postRepository.create(post);
    return res.status(201).json({
      message: "Post created successfully",
      success: true,
      data: { createdPost },
    });
  };

  React = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { reaction } = req.body;
    await ReactProvider(
      this.postRepository,
      id as string,
      reaction as string,
      userId.toString(),
      "Post"
    );
    return res.sendStatus(204);
  };

  getSpecific = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await this.postRepository.exists(
      { _id: id },
      {},
      {
        populate: [
          {
            path: "userId",
            select: "fullName firstName lastName",
          },
          {
            path: "reactions.userId",
            select: "fullName firstName lastName",
          },
          {
            path: "comments",
            match: { parentIds: [] },
            populate: [
              {
                path: "userId",
                select: "fullName firstName lastName",
              },
            ],
          },
        ],
      }
    );
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return res.status(200).json({
      message: "Post found successfully",
      success: true,
      data: { post },
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const post = await this.postRepository.exists({ _id: id });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    if (post.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException(
        "You are not authorized to delete this post"
      );
    }
    await this.postRepository.delete({ _id: id });
    return res.sendStatus(204);
  };
}

export default new PostService();
