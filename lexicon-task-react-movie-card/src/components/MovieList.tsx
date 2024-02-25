import { IMovie } from './AddMovie';
import {MovieCard} from './MovieCard';
import React from 'react';

export const MovieList: React.FC<{ movies: IMovie[] }> = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies available.</p>;
  }

  return (
    <section className="movie-list">
      <h2>Movies</h2>
      {movies.map((movie) => (
        <article key={movie.title}>
          <MovieCard {...movie} />
        </article>
      ))}
    </section>
  );
};