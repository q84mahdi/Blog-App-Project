import { AnswerComment, Comment } from "@/types/commentTypes";
import Avatar from "@/ui/Avatar";
import Button from "@/ui/Button";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

interface CommentBoxProps {
  comment: Comment | AnswerComment;
  onAddComment?: () => void;
}

function CommentBox({ comment, onAddComment = () => {} }: CommentBoxProps) {
  return (
    <div>
      {/* Comment Header */}
      <div className="mb-5 flex items-center justify-between border-b border-b-secondary-200/70 pb-2">
        {/* Comment Auther */}
        <div className="flex items-center gap-x-2">
          <Avatar size={34} src={comment.user.avatarUrl || undefined} />

          <div className="w-full">
            <span className="mb-1 block text-sm font-bold text-secondary-600">
              {comment.user.name}
            </span>

            <span className="block text-xs text-secondary-500">
              {comment.createdAt}
            </span>
          </div>
        </div>

        {/* Comment Reply Button */}
        <div>
          {comment.openToComment && (
            <Button
              onClick={onAddComment}
              variant="secondary"
              className="flex items-center gap-x-1 rounded-md p-2 text-sm"
            >
              <span className="ml-1">
                <ArrowUturnRightIcon className="h-4 w-4" />
              </span>

              <span>پاسخ</span>
            </Button>
          )}
        </div>
      </div>

      {/* Comment Content */}
      <p className="text-sm leading-loose text-secondary-700 lg:text-base lg:leading-8">
        {comment.content.text}
      </p>
    </div>
  );
}
export default CommentBox;
