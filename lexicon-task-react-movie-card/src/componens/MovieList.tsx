import { IMovie } from './AddMovie';
import { MovieCard } from './MovieCard';

export const MovieList: React.FC<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <div className='movie-list'>
      <h2>Movies</h2>
      {movies.map((movie) => (
        <MovieCard key={movie.title} {...movie} />
      ))
      }
    </div>

  )
};

