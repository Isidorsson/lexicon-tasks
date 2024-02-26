import '../styles/AddMovie.css';

import { useEffect, useRef, useState } from 'react';

import { MovieList } from './MovieList';

export interface IMovie {
  title: string;
  rating: number;
  genre: string;
  description: string;
}

export const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleAddMovie = () => {
    if (!title || !genre || !description) {
      alert('Please fill out all fields');
      return;
    }
    if (title && movies.some((movie) => movie.title === title)) {
      alert('Movie already exists');
      return;
    }
    
    const newMovie: IMovie = {
      title,
      rating,
      genre,
      description,
    };
    setMovies([...movies, newMovie]);
    setTitle('');
    setRating(1);
    setGenre('');
    setDescription('');
  };

  const handleRemoveMovie = () => {
    if (window.confirm('Are you sure you want to clear all movies?')) {
      setMovies([]);
    }
  };


  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `calc((100% / (5 - 1)) * (${rating} - 1))`;
    }
  }, [rating]);


  return (
    <><div className="controls-wrapper">
      <h2>Add Movie </h2>
      <input
        className='input-title'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)} />
      <input
        className='input-rating'
        type="range"
        min={1}
        max={5}
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))} />
      <div className='indicator-wrapper'>
        <span ref={indicatorRef} className='indicator-rating'>{rating}</span>
      </div>
      <select className='input-genre' value={genre} onChange={(event) => setGenre(event.target.value)}>
        <option value="">Select Genre</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
      </select>
      <textarea
        className='input-description'
        name="Description"
        placeholder='Description'
        value={description}
        onChange={(event) => setDescription(event.target.value)} />

      <div className='btn-wrapper'>
        {/* <button className='add-movie-btn' onClick={() => { handleAddMovie }}>Add Movie</button> */}
        <button className='clear-movie-btn' onClick={handleRemoveMovie}>Clear</button>
        <button className='add-movie-btn' onClick={handleAddMovie}>Add Movie</button>
      </div>

    </div>
      <MovieList movies={movies} />

    </>
  );

};