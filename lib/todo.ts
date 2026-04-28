export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = "all";

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
}

export function filterTodos(todos: Todo[], _filter: Filter): Todo[] {
  return todos;
}
