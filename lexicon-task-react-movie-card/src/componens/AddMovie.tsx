import { useState } from "react";

export interface IMovie {
  title: string;
  rating: number;
  genre: string;
  description: string;
}


export const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  return (
    <div>
      <h2>Add Movie</h2>
      <input type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
<input type="range" min="1" max="5" value="4" />
    </div>
  );
}