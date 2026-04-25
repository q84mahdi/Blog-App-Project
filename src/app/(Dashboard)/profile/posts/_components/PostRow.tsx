import Table from "@/ui/Table";
import dateFormatter from "@/utils/dateFormatter";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import truncateText from "@/utils/truncateText";
import { DeletePost, UpdatePost } from "./Buttons";
import { Post } from "@/types/postTypes";

interface PostRowProps {
  post: Post;
  index: number;
}

const typeStyles = {
  free: {
    label: "رایگان",
    className: "badge--success",
  },

  premium: {
    label: "ویژه",
    className: "badge--primary",
  },
};

function PostRow({ post, index }: PostRowProps) {
  const { title, category, readingTime, createdAt, type } = post;

  return (
    <Table.Row>
      <td>{toPersianNumbers(index + 1)}</td>

      <td>{truncateText(title, 30)}</td>

      <td>{category.title}</td>

      <td>{toPersianNumbers(readingTime)} دقیقه</td>

      <td>{dateFormatter(createdAt)}</td>

      <td>
        <span className={`badge ${typeStyles[type].className}`}>
          {typeStyles[type].label}
        </span>
      </td>

      <td>
        <div className="flex items-center justify-center gap-x-1">
          <UpdatePost id={post._id} />

          <DeletePost post={post} />
        </div>
      </td>
    </Table.Row>
  );
}
export default PostRow;
