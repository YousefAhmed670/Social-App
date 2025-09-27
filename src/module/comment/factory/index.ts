import { IComment, IPost, IUser } from "../../../utilities";
import { createCommentDto } from "../comment.dto";
import { Comment } from "../entity";

export default class CommentFactoryService {
  createComment = (
    createCommentDto: createCommentDto,
    user: IUser,
    post: IPost,
    comment?: IComment
  ) => {
    const newComment = new Comment();
    newComment.userId = user._id;
    newComment.postId = post._id;
    newComment.content = createCommentDto.content;
    newComment.parentIds = comment ? [...comment.parentIds, comment._id] : [];
    newComment.reactions = [];
    newComment.mentions = [];
    return newComment;
  };
}
