import truncateText from "@/utils/truncateText";
import { DeleteCategory, UpdateCategory } from "./Buttons";
import dateFormatter from "@/utils/dateFormatter";
import Table from "@/ui/Table";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { Category } from "@/types/categoryTypes";

interface CategoryRowProps {
  category: Category;
  index: number;
}

function CategoryRow({ category, index }: CategoryRowProps) {
  const { title, englishTitle, description, createdAt } = category;

  return (
    <Table.Row>
      <td>{toPersianNumbers(index + 1)}</td>

      <td>{title}</td>

      <td>{englishTitle}</td>

      <td>{truncateText(description, 30)}</td>

      <td>{dateFormatter(createdAt)}</td>

      <td>
        <div className="flex items-center justify-center gap-x-1">
          <UpdateCategory id={category._id} />

          <DeleteCategory category={category} />
        </div>
      </td>
    </Table.Row>
  );
}
export default CategoryRow;
