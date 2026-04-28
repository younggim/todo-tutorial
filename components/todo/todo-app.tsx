"use client";

import { useState } from "react";

import { useTodos } from "@/hooks/use-todos";
import { filterTodos, type Filter } from "@/lib/todo";
import { TodoFilter } from "./todo-filter";
import { TodoInput } from "./todo-input";
import { TodoList } from "./todo-list";

export function TodoApp() {
  const { todos, hydrated, addTodo, toggleTodo, removeTodo, updateTodoText } =
    useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = filterTodos(todos, filter);

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <TodoInput onAdd={addTodo} />
      <TodoFilter value={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        hydrated={hydrated}
        onToggle={toggleTodo}
        onRemove={removeTodo}
        onUpdate={updateTodoText}
      />
    </div>
  );
}
