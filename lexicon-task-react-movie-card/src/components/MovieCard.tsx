import { IMovie } from './AddMovie';
import React from 'react';

export const MovieCard: React.FC<IMovie> = ({ title, rating, genre, description }) => {
  return (
    <article className="movie-card">
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>Genre: {genre}</p>
      <p>{description}</p>
    </article>
  );
};