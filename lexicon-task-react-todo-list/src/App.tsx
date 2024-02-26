import { SortSelect } from './components/SortSelect';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { useTodos } from './hooks/useTodos';

export function App() {
  const { todos, addTodo, toggleTodo, removeTodo, startEditTodo, endEditTodo, sortTodos, moveTodoUp, moveTodoDown, sortItem, setSortItem } = useTodos();

  const [title, setTitle] = useState<string>('Todo');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);


  const editTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      {isEditingTitle && <input className='edit-title-input' type="text" value={title} onChange={event => setTitle(event.target.value)} />}
      <button className='edit-title-btn' onClick={editTitle}>{isEditingTitle ? 'Save Title' : 'Edit Title'}</button>
      <SortSelect sortItem={sortItem} setSortItem={setSortItem} />
      <TodoInput onAddTodo={(text: string) => addTodo(text, title)} />
      <TodoList
        todos={sortTodos(todos)}
        onToggleTodo={toggleTodo}
        onRemoveTodo={removeTodo}
        onStartEditTodo={startEditTodo}
        onEndEditTodo={endEditTodo}
        onMoveTodoUp={moveTodoUp}
        onMoveTodoDown={moveTodoDown}
      />
    </div>
  );
}

