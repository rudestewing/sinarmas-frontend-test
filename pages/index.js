import { Fragment, useContext, useEffect, useState } from "react"
import {useRouter} from 'next/router'
import api from "../services/api"
import ErrorsContext from "../contexts/ErrorsContext"
import GenreDropdown from '../components/GenreDropdown'
import {transformMoviesFromApi} from '../utils/transformers'
import usePrevious from '../hooks/usePrevious'
import MoviesGrid from "../components/MoviesGrid"

export async function getServerSideProps(context) {
  return {
    props: {
      page: context.query.page ? parseInt(context.query.page) : 1,
      genreId: context.query.genreId ? String(context.query.genreId) : ''
    }
  }
}

const PageComponent = (props) => {
  const router = useRouter()
  const [movies, setMovies] = useState([])
  const [params, setParams] = useState({
    page: parseInt(props.page),
    genreId: props.genreId
  })
  const previousParams = usePrevious(params)
  const {errors, setErrors, clearErrors, removeError} = useContext(ErrorsContext.Context)
  const [loading, setLoading] = useState(false)
  const [initializedRender, setInitializedRender] = useState(false)

  async function initRender() {
    setInitializedRender(false)
    await loadInitialData()
    setInitializedRender(true)
  }

  async function loadInitialData() {
    try {
      setMovies([])
      removeError('fetching')
      setLoading(true)

      const response = await api.discover({
        page: params.page,
        genreIds: params.genreId
      })

      const {data} = response

      setMovies(transformMoviesFromApi(data.results))

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  async function loadMoreData() {
    try {
      removeError('fetching')
      setLoading(true)

      const response = await api.discover({
        page: params.page,
        genreIds: params.genreId
      })

      const {data} = response

      const _movies = transformMoviesFromApi(data.results)

      setMovies((movies) => [...movies, ..._movies])

    } catch (error) {
      console.log(error)
      setErrors({...errors, ['fetching']: 'Sorry, data can`t be loaded because an error.'})

    } finally {
      setLoading(false)
    }
  }

  function handleLoadMore() {
    if(loading) return
    return setParams({...params, page: (parseInt(params.page) + 1)})
  }

  useEffect(() => {
    initRender()
  }, [])

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: params.page,
        genreId: params.genreId
      }
    }).then(() => {
      if(initializedRender)
        return window.scrollTo(0,document.body.scrollHeight);
    })

    if(initializedRender) {
      if(params.genreId != previousParams.genreId) {
        setParams({...params, page: 1})
        initRender()
      } else {
        if(params.page > 0)
        loadMoreData()
      }
    }
  }, [params])

  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <div className="mb-5">
            <GenreDropdown id={params.genreId} handleChangeGenre={(genreId) => setParams({...params, genreId})} />
          </div>
          <MoviesGrid movies={movies} loading={loading} />
          <button
            type="button"
            className={`
            bg-blue-500 text-gray-100 px-3 py-2 rounded-md
            ${loading && 'bg-blue-300'}
            `}
            onClick={handleLoadMore}>
              Load More
          </button>
        </div>
      </section>
    </Fragment>
  )
}

export default PageComponent
