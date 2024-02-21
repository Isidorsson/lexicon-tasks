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
  

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo}  onRemoveTodo={removeTodo} />
    </div>
  );
}


