import '../styles/AddMovie.css';

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
    <div className="controls-wrapper">
      <h2>Add Movie </h2>
      <input
        className='input-title'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className='input-rating'
        type="range"
        min={0}
        max={5}
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      />
      <select className='input-genre' value={genre} onChange={(event) => setGenre(event.target.value)}>
        <option value="">Select Genre</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
      </select>
      <textarea
        className='input-description'
        name="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)} />
      <button className='add-movie-button' onClick={() => { handleAddMovie }}>Add Movie</button>

    </div>
  );

}