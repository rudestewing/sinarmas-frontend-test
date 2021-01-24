import { Fragment } from 'react'
import MovieItem from '../components/MovieItem'

const MoviesGrid = ({movies, loading}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-5">
      {
        movies.length ?
          movies.map((movie, index) => <MovieItem key={index} movie={movie} />) :
          loading ?
            (
              <div>
                Loading Data ...
              </div>
            ) :
            (
              <div>
                Sorry, No Data ..
              </div>
            )
      }
    </div>
  )
}

export default MoviesGrid
