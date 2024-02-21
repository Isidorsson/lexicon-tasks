import { ITodo } from '../App';

interface ITodoItemProps {
  todo: ITodo;
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;

}

export function TodoItem({ todo, onToggleTodo, onRemoveTodo }: ITodoItemProps) {
  const { id, text, completed } = todo;

  return (
    <li className={completed ? 'completed' : ''}>
      <input type="checkbox" checked={completed} onChange={() => onToggleTodo(id)} />
      <span>{text}</span>
      <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

