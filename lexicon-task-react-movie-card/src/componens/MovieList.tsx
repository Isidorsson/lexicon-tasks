import { IMovie } from '../componens/AddMovie';

export const MovieList: React.FC<{ movies: IMovie[] }> = ({ movies }) => { 
   
// console.log(`Movies: ${JSON.stringify(movies)}`);

  
  return (
    <div className='movie-list'>
      <h2>Movies</h2>

    </div>

  )
};

