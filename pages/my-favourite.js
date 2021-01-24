import { Fragment, useContext, useEffect, useState } from "react"
import MoviesGrid from "../components/MoviesGrid"
import FavouritesContext from "../contexts/FavouritesContext"
import api from "../services/api"
import {transformMovieDetail} from '../utils/transformers'

const PageComponent = () => {
  const {favourites, removeFromFavourites} = useContext(FavouritesContext.Context)
  const [movies, setMovies] = useState([])

  async function getMovieData(favouriteId) {
    try {
      const response = await api.movieDetail(favouriteId)
      const {data} = response

      return transformMovieDetail(data)
    } catch (error) {
      throw new Error('failed')
    }
  }

  function loadMovies() {
    Promise.all(favourites.map(async (favouriteId) => {
      const data = await getMovieData(favouriteId)
      return data
    }))
    .then((data) => {
      setMovies(data)
    })
  }

  useEffect(() => {
    loadMovies()
  }, [])

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <MoviesGrid movies={movies} />
        </div>
      </section>
    </Fragment>
  )
}

export default PageComponent
