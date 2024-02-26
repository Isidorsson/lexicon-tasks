import '../styles/TodoItem.css'

import { ITodoItemProps, ITodoProps } from '../interfaces/TodoInterfaces';

// import { ITodoItemProps } from './TodoInterface';

// export function TodoItem(props: ITodoItemProps) {
export function TodoItem(props: ITodoItemProps & ITodoProps) {
  const { id, text, completed, isEditing }   = props.todo;

  const handleDoubleClick = () => {
    props.onStartEditTodo(id);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onEndEditTodo(id, event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.onEndEditTodo(id, event.currentTarget.value);
    }
  }

  const handleMoveUp = () => {
    props.onMoveTodoUp(id);
  };

  const handleMoveDown = () => {
    props.onMoveTodoDown(id);
  };
  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <span className='todo-timestamp'>{props.todo.createdAt.toLocaleTimeString("en-GB")}</span>
      {/* <span className='todo-timestamp'>{todo.createdAt.toLocaleDateString("en-GB")}</span> */}
      {/* <span className='todo-timestamp'>{todo.createdAt.toLocaleTimeString("en-GB")}</span> */}

      <input className='todo-checkbox' type="checkbox" checked={completed} onChange={() => props.onToggleTodo(id)} />
      {isEditing ? (
        <input type="text" defaultValue={text} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
      ) : (
        <span className='item-text' onDoubleClick={handleDoubleClick}>{text}</span>
      )}
      <div className='btn-wrapper'>
        <button className='todo-btn-remove' onClick={() => props.onRemoveTodo(id)}>Remove</button>
        <button className='todo-btn-move-up' onClick={handleMoveUp}>Move Up</button>
        <button className='todo-btn-move-down' onClick={handleMoveDown}>Move Down</button>
      </div>
    </li>
  );
}