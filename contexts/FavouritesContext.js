import { createContext, useEffect, useState } from "react";
import localStorageData from 'local-storage-data'

const localStorageKey = 'favourites'

const Context = createContext()

const Provider = (props) => {
  const [favourites, setFavourites] = useState([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const _favourites = localStorageData.get(localStorageKey)
    setFavourites(_favourites)
    setInitialized(true)
  }, [])

  useEffect(() => {
    if(initialized)
      localStorageData.set(localStorageKey, favourites)
  }, [favourites])

  function addToFavourites(id) {
      const _favourites = [...favourites, id]

      setFavourites(_favourites)
  }

  function removeFromFavourites(id) {
    const _favourites = [...favourites].filter(favouriteId => favouriteId != id)

    setFavourites(_favourites)
  }

  return (
    <Context.Provider value={{
      favourites,
      addToFavourites,
      removeFromFavourites,
      total: favourites.length
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default {
  Context,
  Provider
}
