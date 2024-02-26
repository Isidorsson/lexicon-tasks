// TodoInterfaces.ts
export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
  createdAt: Date;
  author: string;
}

export interface ITodoProps {
  todos: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onStartEditTodo: (id: number) => void;
  onEndEditTodo: (id: number, text: string) => void;
  onMoveTodoUp: (id: number) => void;
  onMoveTodoDown: (id: number) => void;
}

export interface ITodoItemProps extends ITodoProps {
  todo: ITodo;
}

export interface ITodoInputProps {
  onAddTodo: (text: string, authorTitle: string) => void;

}


export interface ISortSelectProps {
  sortItem: 'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author';
  setSortItem: (value: 'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author') => void;
}


// export interface ITodoListProps {
//   todos: ITodo[];
//   onToggleTodo: (id: number) => void;
//   onRemoveTodo: (id: number) => void;
//   onStartEditTodo: (id: number) => void;
//   onEndEditTodo: (id: number, newText: string) => void;
//   onMoveTodoUp: (id: number) => void;
//   onMoveTodoDown: (id: number) => void;
// }

// export interface ITodoItemProps {
//   todo: ITodo;
//   onToggleTodo: (id: number) => void;
//   onRemoveTodo: (id: number) => void;
//   onStartEditTodo: (id: number) => void;
//   onEndEditTodo: (id: number, newText: string) => void;
//   onMoveTodoUp: (id: number) => void;
//   onMoveTodoDown: (id: number) => void;
// }



