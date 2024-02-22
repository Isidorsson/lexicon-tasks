import '../styles/TodoItem.css'

import { ITodoItemProps } from './TodoInterface';

export function TodoItem({ todo, onToggleTodo, onRemoveTodo, onStartEditTodo, onEndEditTodo }: ITodoItemProps) {
  const { id, text, completed, isEditing } = todo;

  const handleDoubleClick = () => {
    onStartEditTodo(id);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onEndEditTodo(id, event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEndEditTodo(id, event.currentTarget.value);
    }
  }


  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <span className='todo-timestamp'>{todo.createdAt.toLocaleTimeString("en-GB")}</span>
      {/* <span className='todo-timestamp'>{todo.createdAt.toLocaleDateString("en-GB")}</span> */}
      {/* <span className='todo-timestamp'>{todo.createdAt.toLocaleTimeString("en-GB")}</span> */}

      <input className='todo-checkbox' type="checkbox" checked={completed} onChange={() => onToggleTodo(id)} />
      {isEditing ? (
        <input  type="text" defaultValue={text} onBlur={handleBlur} onKeyDown={handleKeyDown} autoFocus />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{text}</span>
      )}
      <button className='todo-btn-remove' onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}