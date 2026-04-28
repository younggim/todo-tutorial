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
});
