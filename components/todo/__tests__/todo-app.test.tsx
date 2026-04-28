import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TodoApp } from "../todo-app";

function getInput() {
  return screen.getByPlaceholderText("할 일을 입력하고 Enter 를 누르세요");
}

describe("TodoApp", () => {
  it("입력 필드에 \"장보기\" 입력 후 Enter 를 누르면 목록에 추가된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(getInput(), "장보기{Enter}");

    expect(screen.getByText("장보기")).toBeInTheDocument();
    expect(getInput()).toHaveValue("");
  });

  it("빈 입력 상태에서 Enter 를 누르면 Todo 가 추가되지 않는다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(getInput(), "{Enter}");
    await user.type(getInput(), "   {Enter}");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("할 일을 추가해보세요")).toBeInTheDocument();
  });

  it("체크박스를 클릭하면 완료 표시(취소선)가 적용된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(getInput(), "운동{Enter}");

    const item = screen.getByRole("listitem");
    const checkbox = within(item).getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(within(item).getByText("운동")).toHaveClass("line-through");
  });

  it("삭제 버튼을 클릭하면 해당 항목이 제거된다", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    await user.type(getInput(), "청소{Enter}");
    await user.type(getInput(), "빨래{Enter}");

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    const targetItem = screen.getByText("청소").closest("li") as HTMLElement;
    const deleteButton = within(targetItem).getByRole("button");
    await user.click(deleteButton);

    expect(screen.queryByText("청소")).not.toBeInTheDocument();
    expect(screen.getByText("빨래")).toBeInTheDocument();
  });

  it("페이지를 새로고침해도 기존 목록이 유지된다", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<TodoApp />);

    await user.type(getInput(), "독서{Enter}");
    expect(screen.getByText("독서")).toBeInTheDocument();

    unmount();
    render(<TodoApp />);

    expect(await screen.findByText("독서")).toBeInTheDocument();
  });
});
