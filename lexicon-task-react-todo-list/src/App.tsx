import { SortSelect } from './components/SortSelect';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { useTodos } from './hooks/useTodos';

export function App() {
  const { todos, addTodo, toggleTodo, removeTodo, startEditTodo, endEditTodo, sortTodos, sortItem, setSortItem } = useTodos();

  const [title, setTitle] = useState<string>('Todo');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

  const editTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      {isEditingTitle && <input className='edit-title-input' type="text" value={title} onChange={e => setTitle(e.target.value)} />}
      <button className='edit-title-btn' onClick={editTitle}>{isEditingTitle ? 'Save Title' : 'Edit Title'}</button>
      <SortSelect sortItem={sortItem} setSortItem={setSortItem} />
      <TodoInput onAddTodo={addTodo} />
      <TodoList
        todos={sortTodos(todos)}
        onToggleTodo={toggleTodo}
        onRemoveTodo={removeTodo}
        onStartEditTodo={startEditTodo}
        onEndEditTodo={endEditTodo}
         
      />
    </div>
  );
}