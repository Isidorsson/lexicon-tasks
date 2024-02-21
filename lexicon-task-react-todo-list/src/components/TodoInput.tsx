import { useState } from 'react';

interface ITodoInputProps {
  onAddTodo: (text: string) => void;
}

export function TodoInput({ onAddTodo }: ITodoInputProps) {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(`Submitting: ${text}`);
    if (!text.trim()) return;
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} placeholder="Add a todo..." />
      <button type="submit">Add</button>
    </form>
  );
}

