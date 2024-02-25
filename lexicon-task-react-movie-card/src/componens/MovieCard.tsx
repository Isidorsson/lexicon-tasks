import { IMovie } from './AddMovie';

export const MovieCard: React.FC<IMovie> = (props: IMovie) => {
  return (
    <div className='movie-card'>
      <h1>test</h1>
      <h3>{props.title}</h3>
      <p>Rating: {props.rating}</p>
      <p>Genre: {props.genre}</p>
      <p>{props.description}</p>
    </div>
  );
};


