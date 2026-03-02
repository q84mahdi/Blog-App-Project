import { User } from "@/types/authTypes";
import Table from "@/ui/Table";
import dateFormatter from "@/utils/dateFormatter";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

interface UserRowProps {
  user: User;
  index: number;
}

function UserRow({ user, index }: UserRowProps) {
  const { name, email, createdAt } = user;

  return (
    <Table.Row>
      <td>{toPersianNumbers(index + 1)}</td>

      <td>{name}</td>

      <td>{email}</td>

      <td>{dateFormatter(createdAt)}</td>

      <td>
        <span className={`badge badge--success`}>فعال</span>
      </td>
    </Table.Row>
  );
}
export default UserRow;
