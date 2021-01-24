import { useContext, useEffect, useState } from "react"
import FavouritesContext from "../contexts/FavouritesContext"

const Rating = ({rate = 0}) => {
  return (
    <ul className="flex justify-center">
      {
        Array.from({length: Math.floor(rate)}).map((_, index) => {
            return (
              <li key={index}>
                <i className="fas fa-star text-yellow-400" style={{fontSize: '0.5rem'}}></i>
              </li>
            )
          })
      }
    </ul>
  )
}

const MovieItem = (props) => {
  const {favourites, addToFavourites, removeFromFavourites} = useContext(FavouritesContext.Context)
  const [showDetail, setShowDetail] = useState(false)

  const {movie} = props

  const {
    id,
    original_title,
    vote_average,
    poster_path
  } = movie

  function containFavourite() {
    return [...favourites].includes(movie.id) ? true : false
  }

  function imageUrl() {
    const url = `${process.env.NEXT_PUBLIC_MOVIEDB_IMAGE_BASE_URL}/t/p/`
    return {
      poster: `${url}/w500/${poster_path}`,
    }
  }

  function handleFavourite() {
    if(!containFavourite())
      return addToFavourites(movie.id)

    return removeFromFavourites(movie.id)
  }

  return (
    <div>
      <div
        className="relative overflow-hidden h-52"
        // style={{height: '200px'}}
        onMouseOver={() => setShowDetail(true)}
        onMouseLeave={() => setShowDetail(false)}
      >
        <div className="absolute h-full w-full bg-gray-600" style={{zIndex: -1}}></div>
        <img src="" alt="" src={imageUrl().poster} className="h-full w-full object-top object-cover"/>
        {
          (showDetail || containFavourite()) &&
            <div
              className="absolute z-20 cursor-pointer"
              style={{
                top: 10,
                right: 10
              }}
              onClick={handleFavourite}
            >
              <i className={`fas fa-heart text-xl ${containFavourite() ? 'text-red-500' : 'text-gray-100'}`}></i>
            </div>
        }

        {
          showDetail &&
            (
              <div
                className="absolute z-10 bg-gray-900 bg-opacity-60 text-gray-100 h-full"
                style={{bottom: 0, left: 0, right: 0}}
              >
                <div className="relative h-full">
                  <div
                    className="absolute h-16 p-3 cursor-pointer"
                    style={{
                      left:0,
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    {original_title}
                  </div>
                </div>
              </div>
            )
        }
      </div>
      <Rating rate={vote_average} />
    </div>
  )
}

export default MovieItem
