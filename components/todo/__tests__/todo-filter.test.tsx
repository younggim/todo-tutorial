import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoApp } from "../todo-app";

const INPUT_PLACEHOLDER = "할 일을 입력하고 Enter 를 누르세요";

async function seedFiveTodos(user: ReturnType<typeof userEvent.setup>) {
  const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
  for (const text of ["A", "B", "C", "D", "E"]) {
    await user.type(input, `${text}{Enter}`);
  }
  for (const text of ["A", "B"]) {
    const li = screen.getByText(text).closest("li") as HTMLElement;
    const checkbox = li.querySelector("[role=checkbox]") as HTMLElement;
    await user.click(checkbox);
  }
}

describe("TodoApp 필터링", () => {
  it("'전체' 필터를 선택하면 모든 항목(완료 2 + 미완료 3 = 5)이 표시된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await seedFiveTodos(user);

    await user.click(screen.getByRole("button", { name: "전체" }));

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("'진행중' 필터를 선택하면 미완료 항목 3개만 표시된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await seedFiveTodos(user);

    await user.click(screen.getByRole("button", { name: "진행중" }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const li of items) {
      const checkbox = li.querySelector("[role=checkbox]") as HTMLElement;
      expect(checkbox).not.toBeChecked();
    }
  });

  it("'완료' 필터를 선택하면 완료 항목 2개만 표시된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await seedFiveTodos(user);

    await user.click(screen.getByRole("button", { name: "완료" }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    for (const li of items) {
      const checkbox = li.querySelector("[role=checkbox]") as HTMLElement;
      expect(checkbox).toBeChecked();
    }
  });

  it("Todo 가 0개일 때 '진행중' 필터 선택 시 '할 일이 없습니다' 메시지가 표시된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.click(screen.getByRole("button", { name: "진행중" }));

    expect(screen.getByText("할 일이 없습니다")).toBeInTheDocument();
    expect(screen.queryByText("할 일을 추가해보세요")).not.toBeInTheDocument();
  });
});
