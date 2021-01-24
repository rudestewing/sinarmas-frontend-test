import { useEffect, useState } from "react"
import api from "../services/api"

const GenreDropdown = ({id, handleChangeGenre}) => {
  const [genres, setGenres] = useState([])

  async function loadGenres() {
    try {
      const response = await api.genre()

      const {data} = response

      const _genres = [...data.genres].map((genre) => {
        const {
          id,
          name
        } = genre

        return {
          id,
          name
        }
      })

      setGenres(_genres)

    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(e) {
    return handleChangeGenre(e.target.value)
  }

  useEffect(() => {
    loadGenres()
  }, [])

  return (
    <select onChange={handleChange} value={id} className="text-gray-700">
      <option value=""> All </option>
      {
        genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {String(genre.name).toUpperCase()}
            </option>
          )
        })
      }
    </select>
  )
}

export default GenreDropdown
