import { IMovie } from './AddMovie';
import React from 'react';

export const MovieCard: React.FC<IMovie> = (props) => {
  return (
    <div className="movie-card">
      <h3>{props.title}</h3>
      <p>Rating: {props.rating}</p>
      <p>Genre: {props.genre}</p>
      <p>{props.description}</p>
    </div>
  );
};

