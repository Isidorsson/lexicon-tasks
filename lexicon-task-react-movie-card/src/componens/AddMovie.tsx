import { useState } from "react";

export interface IMovie {
  title: string;
  rating: number;
  genre: string;
  description: string;
}


export const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  return (
    <div>
      <h2>Add Movie</h2>
      <input type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input type="range" min={0} max={5} value={rating}
        onChange={(event) => setRating(parseInt(event.target.value))}
      />
    </div>
  );
}