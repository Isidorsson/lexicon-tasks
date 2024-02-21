import '../styles/TodoItem.css'

import { ITodo } from '../App';

interface ITodoItemProps {
  todo: ITodo;
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;

}

export function TodoItem({ todo, onToggleTodo, onRemoveTodo }: ITodoItemProps) {
  const { id, text, completed } = todo;

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <input className='todo-checkbox' type="checkbox" checked={completed} onChange={() => onToggleTodo(id)} />
      <span>{text}</span>
      <button className='todo-btn-remove' onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

