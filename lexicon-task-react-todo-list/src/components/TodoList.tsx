import '../styles/TodoList.css';

import { ITodoListProps } from './TodoInterface';
import { TodoItem } from '../components/TodoItem';

export function TodoList(props: ITodoListProps) {

  return (
    <ul className='todo-list'>
      {props.todos.map((todo) => (

        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={props.onToggleTodo}
          onRemoveTodo={props.onRemoveTodo}
          onStartEditTodo={props.onStartEditTodo}
          onEndEditTodo={props.onEndEditTodo}
          onMoveTodoUp={props.onMoveTodoUp}
          onMoveTodoDown={props.onMoveTodoDown}
        />
      ))}
    </ul>
  );
}



