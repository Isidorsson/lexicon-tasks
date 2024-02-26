import '../styles/TodoList.css';

import { ITodoProps } from '../interfaces/TodoInterfaces';
import { TodoItem } from '../components/TodoItem';

// import { ITodoListProps } from './TodoInterface';
// import { ITodoListProps } from '../interfaces/TodoInterfaces';

export function TodoList(props: ITodoProps) {
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
          onMoveTodoDown={props.onMoveTodoDown} todos={[]} />
      ))}
    </ul>
  );
}



