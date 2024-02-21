// TodoInterfaces.ts
export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: Date;
  author: string;
}

export interface ITodoListProps {
  todos: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onStartEditTodo: (id: number) => void;
  onEndEditTodo: (id: number, newText: string) => void;
}

export interface ITodoItemProps {
  todo: ITodo;
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onStartEditTodo: (id: number) => void;
  onEndEditTodo: (id: number, newText: string) => void;
}

export interface ITodoInputProps {
  onAddTodo: (text: string) => void;
}


export interface SortSelectProps {
  sortItem: 'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author';
  setSortItem: (value: 'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author') => void;
}
