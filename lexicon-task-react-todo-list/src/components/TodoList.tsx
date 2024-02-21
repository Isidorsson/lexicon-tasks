import '../styles/TodoList.css';

import { ITodo } from '../App';
import { TodoItem } from '../components/TodoItem';

interface ITodoListProps {
  todos: ITodo[];
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
  onStartEditTodo: (id: number) => void;
  onEndEditTodo: (id: number, newText: string) => void;

}


export function TodoList({ todos, onToggleTodo, onRemoveTodo,  onStartEditTodo, onEndEditTodo }: ITodoListProps) {

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onRemoveTodo={onRemoveTodo}
          onStartEditTodo={onStartEditTodo}
          onEndEditTodo={onEndEditTodo}
          
        />
      ))}
    </ul>
  );
}