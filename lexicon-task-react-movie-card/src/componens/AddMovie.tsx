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
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleAddMovie = () => {
    const newMovie = { title, rating, genre, description };
    console.log(`Adding movie: ${JSON.stringify(newMovie)}`);
    setMovies([...movies, newMovie]);
    setTitle('');
    setRating(0);
    setGenre('');
    setDescription('');
  }

  return (
    <div>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="range"
        min={0}
        max={5}
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      />
      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        <option value="">Select Genre</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
      </select>
      <textarea name="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)} />
      <button onClick={() => {handleAddMovie}}>Add Movie</button>
      

    </div>
  );

}