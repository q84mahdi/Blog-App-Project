"use client";

import Button from "@/ui/Button";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import CommentBox from "./CommentBox";
import classNames from "classnames";
import Modal from "@/ui/Modal";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { Comment } from "@/types/commentTypes";

interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

function PostComments({ comments, postId }: PostCommentsProps) {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState<Comment | null>(null);

  const addNewCommentHandler = (parent: Comment | null) => {
    setParent(parent);
    setOpen(true);
  };

  return (
    <div className="py-2">
      {/* Post Comments Modal */}
      <Modal
        title={parent ? "پاسخ به نظر" : "ثبت نظر جدید"}
        description={parent ? parent.user.name : "نظر خود را وارد کنید"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <CommentForm
          postId={postId}
          parentId={parent ? parent._id : undefined}
          onClose={() => setOpen(false)}
        />
      </Modal>

      {/* Post Comments Header */}
      <div className="mb-8 flex items-center justify-between gap-y-3">
        <h2 className="text-xl font-bold text-secondary-700">نظرات کاربران</h2>

        <Button
          variant="outline"
          className="flex items-center py-2 text-sm"
          onClick={() => addNewCommentHandler(null)}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="ml-2 h-5 w-5" />
          <span>ثبت نظر جدید</span>
        </Button>
      </div>

      {/* Post Comments Content */}
      <div className="post-comments space-y-8 rounded-xl bg-secondary-0 px-3 py-6 lg:px-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id}>
              {/* Main Comments */}
              <div className="mb-3 rounded-xl border border-secondary-200 p-2 sm:p-4">
                <CommentBox
                  comment={comment}
                  onAddComment={() => addNewCommentHandler(comment)}
                />
              </div>

              {/* Answer Comments */}
              {comment.answers.length > 0 && (
                <div className="post-comments__answer mr-2 space-y-3 sm:mr-8">
                  {comment.answers.map((answer, index) => (
                    <div key={answer._id} className="relative">
                      <div
                        className={classNames(
                          "answer-item rounded-xl border border-secondary-200/50 bg-secondary-100/50 p-2 sm:p-4",
                          {
                            "last-item": index + 1 === comment.answers.length,
                          },
                        )}
                      >
                        <CommentBox comment={answer} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center font-bold text-secondary-600">
            هیچ نظری برای این پست ثبت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}
export default PostComments;
