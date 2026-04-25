import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { ClockIcon } from "@heroicons/react/24/outline";

interface PostReadingTime {
  time: string | number;
}

function PostReadingTime({ time }: PostReadingTime) {
  return (
    <div className="flex items-center gap-1 text-[12px] text-secondary-500">
      <ClockIcon className="h-4 w-4 stroke-secondary-500" />

      <span className="text-nowrap">
        خواندن: <strong>{toPersianNumbers(time)}</strong> دقیقه
      </span>
    </div>
  );
}
export default PostReadingTime;
