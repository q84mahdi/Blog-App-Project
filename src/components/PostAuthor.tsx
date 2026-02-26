import Avatar from "@/ui/Avatar";
import truncateText from "@/utils/truncateText";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface PostAuthorProps {
  name: string;
  avatarUrl: string | StaticImport | undefined;
  isTruncate: boolean;
}

function PostAuthor({ name, avatarUrl, isTruncate = false }: PostAuthorProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Avatar src={avatarUrl} />

      <span className="text-sm text-secondary-600">
        {isTruncate ? truncateText(name, 5) : name}
      </span>
    </div>
  );
}
export default PostAuthor;
