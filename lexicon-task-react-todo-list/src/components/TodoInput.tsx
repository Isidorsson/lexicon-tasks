import '../styles/TodoInput.css';

import { ITodoInputProps } from '../interfaces/TodoInterfaces';
import { useState } from 'react';

export function TodoInput(props: ITodoInputProps) {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // console.log(`Submitting: ${text}`);
    if (!text.trim()) return;
    props.onAddTodo(text, 'Todo');
    setText('');
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input className='todo-input' type="text" value={text} onChange={handleChange} placeholder="Add a todo..." />
      <button className='todo-sub-btn' type="submit">Add</button>
    </form>
  );
}

