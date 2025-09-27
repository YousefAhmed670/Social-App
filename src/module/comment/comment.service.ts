import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import { NotFoundException } from "../../utilities";
import { ReactProvider } from "../../utilities/common/provider/react.provider";
import { createCommentDto } from "./comment.dto";
import CommentFactoryService from "./factory";

class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository = new CommentRepository();
  private readonly commentFactoryService = new CommentFactoryService();
  constructor() {}

  create = async (req: Request, res: Response) => {
    const { postId, id } = req.params;
    const createCommentDto: createCommentDto = req.body;
    const postExists = await this.postRepository.exists({ _id: postId });
    if (!postExists) {
      throw new NotFoundException("Post not found");
    }
    let commentExists;
    if (id) {
      commentExists = await this.commentRepository.exists({ _id: id });
      if (!commentExists) {
        throw new NotFoundException("Comment not found");
      }
    }
    const comment = this.commentFactoryService.createComment(
      createCommentDto,
      req.user,
      postExists,
      commentExists
    );
    const createdComment = await this.commentRepository.create(comment);
    res.status(201).json({
      message: "Comment created successfully",
      success: true,
      data: { createdComment },
    });
  };

  react = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { reaction } = req.body;
    await ReactProvider(
      this.commentRepository,
      id as string,
      reaction as string,
      userId.toString(),
      "Comment"
    );
    return res.sendStatus(204);
  };
}

export default new CommentService();
