import '../styles/MovieCard.css';

import { IMovie } from './AddMovie';

export const MovieCard = ({ title, rating, genre, description }: IMovie) => {
  return (
    <article className="movie-card">
      <h3>{title}</h3>
      <p>Rating: {rating}</p>
      <p>Genre: {genre}</p>
      <p>{description}</p>
    </article>
  );
};