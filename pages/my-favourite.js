import { Fragment, useContext, useEffect, useState } from "react"
import MoviesGrid from "../components/MoviesGrid"
import FavouritesContext from "../contexts/FavouritesContext"
import api from "../services/api"
import {transformMovieDetail} from '../utils/transformers'

const PageComponent = () => {
  const {favourites} = useContext(FavouritesContext.Context)
  const [movies, setMovies] = useState([])
  const [initialized, setInitialized] = useState(false)

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
    if(!initialized) {
      if(favourites.length > 0) {
        loadMovies()
        setInitialized(true)
      }
    }
  }, [favourites])

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
