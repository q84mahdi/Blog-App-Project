import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Table from "./Table";

test("composes semantic table subcomponents", () => {
  render(
    <Table>
      <Table.Header>
        <th>Title</th>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <td>Post</td>
        </Table.Row>
      </Table.Body>
    </Table>,
  );

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "Title" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "Post" })).toBeInTheDocument();
});
