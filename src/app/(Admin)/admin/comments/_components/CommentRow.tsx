import { Comment } from "@/types/commentTypes";
import Table from "@/ui/Table";
import dateFormatter from "@/utils/dateFormatter";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import truncateText from "@/utils/truncateText";
import {
  ChangeStatusComment,
  DeleteComment,
} from "app/(Dashboard)/profile/comments/_components/Buttons";

interface CommentRowProps {
  comment: Comment;
  index: number;
}

const statusStyles = [
  {
    label: "رد شده",
    className: "badge--danger",
  },

  {
    label: "در انتظار تایید",
    className: "badge--warning",
  },

  {
    label: "تایید شده",
    className: "badge--success",
  },
];

function CommentRow({ comment, index }: CommentRowProps) {
  const { content, post, user, createdAt, status } = comment;

  return (
    <Table.Row>
      <td>{toPersianNumbers(index + 1)}</td>

      <td>{truncateText(content.text, 30)}</td>

      <td>{post.title}</td>

      <td>{user.name}</td>

      <td>{dateFormatter(createdAt)}</td>

      <td>
        <span className={`badge ${statusStyles[status].className}`}>
          {statusStyles[status].label}
        </span>
      </td>

      <td>
        <div className="flex items-center justify-center gap-x-1">
          <ChangeStatusComment comment={comment} />

          <DeleteComment comment={comment} isAdmin />
        </div>
      </td>
    </Table.Row>
  );
}
export default CommentRow;
