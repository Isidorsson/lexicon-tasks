import { IMovie } from '../componens/AddMovie';

export const MovieList: React.FC<{ movies: IMovie[] }> = ({ movies }) => { 
  return (
    <div className='movie-list'>
      <h2>Movies</h2>

    </div>

  )
};

