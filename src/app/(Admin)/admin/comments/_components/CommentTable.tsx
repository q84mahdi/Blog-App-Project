"use client";

import { useGetComments } from "@/hooks/useComments";
import Empty from "@/ui/Empty";
import Fallback from "@/ui/Fallback";
import Table from "@/ui/Table";
import CommentRow from "./CommentRow";
import Pagination from "@/ui/Pagination";

interface CommentTableProps {
  queries: string;
  hasPagination?: boolean;
}

function CommentTable({ queries, hasPagination = false }: CommentTableProps) {
  const { isLoading, data } = useGetComments(queries);
  const comments = data?.data;

  if (!comments || isLoading) return <Fallback />;

  if (comments.length === 0) return <Empty resourceName="نظری" />;

  return (
    <div>
      <Table>
        <Table.Header>
          <th>#</th>
          <th>متن نظر</th>
          <th>پست</th>
          <th>نویسنده</th>
          <th>تاریخ ایجاد</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </Table.Header>

        <Table.Body>
          {comments.map((comment, index) => (
            <CommentRow key={comment._id} comment={comment} index={index} />
          ))}
        </Table.Body>
      </Table>

      {hasPagination && comments && comments.length > 0 && (
        <div className="mt-5 flex w-full items-center justify-center">
          <Pagination totalPages={data.total} />
        </div>
      )}
    </div>
  );
}
export default CommentTable;
