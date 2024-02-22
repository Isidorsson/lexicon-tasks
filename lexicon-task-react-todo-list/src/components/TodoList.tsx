import '../styles/TodoList.css';

import { ITodoListProps } from './TodoInterface';
import { TodoItem } from '../components/TodoItem';

export function TodoList({ todos, onToggleTodo, onRemoveTodo, onStartEditTodo, onEndEditTodo }: ITodoListProps) {

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        console.log(todo),
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



