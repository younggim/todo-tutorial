export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = "all" | "active";

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return todos.filter((t) => !t.completed);
  return todos;
}
