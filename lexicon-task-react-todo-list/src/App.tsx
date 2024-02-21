import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  }


  const [title, setTitle] = useState<string>('Todo');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const editTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      {isEditingTitle && <input type="text" value={title} onChange={e => setTitle(e.target.value)} />}
      <button onClick={editTitle}>{isEditingTitle ? 'Save Title' : 'Edit Title'}</button>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} onRemoveTodo={removeTodo} />
    </div>
  );
}


