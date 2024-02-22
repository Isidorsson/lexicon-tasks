import { ITodo } from "../components/TodoInterface";
import { useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [sortItem, setSortItem] = useState<'asc' | 'desc' | 'completed' | 'uncompleted' | 'timestamp' | 'author'>('timestamp');

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false, isEditing: false, createdAt: new Date(), author: 'Author Name' }]);
  };

  const startEditTodo = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isEditing: true } : todo));
  };

  const endEditTodo = (id: number, newText: string) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, text: newText, isEditing: false } : todo));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // const editTodo = (id: number, newText: string) => {
  //   setTodos(todos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo));
  // };

  const sortTodos = (todos: ITodo[]) => {
    switch (sortItem) {
      case 'asc':
        return todos.sort((a, b) => a.text.localeCompare(b.text));
      case 'desc':
        return todos.sort((a, b) => b.text.localeCompare(a.text));
      case 'completed':
        return todos.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
      case 'uncompleted':
        return todos.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1);
      case 'timestamp':
        return todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'author':
        return todos.sort((a, b) => a.author.localeCompare(b.author));
      default:
        return todos;
    }
  };

  return { todos, addTodo, toggleTodo, removeTodo, startEditTodo, endEditTodo, sortTodos, sortItem, setSortItem };
};
