import httpClient, {defaultParams} from '../../utils/httpClient'

export default {
  genre: () => httpClient.get('/genre/movie/list', {
    params: {
      ...defaultParams
    }
  }),
  discover: (params = {page: 1, genreIds: null}) => httpClient.get('/discover/movie', {
    params: {
      ...defaultParams,
      sort_by: 'popularity.desc',
      include_adult: 'false',
      include_video: 'false',
      page: params.page,
      with_genres: params.genreIds
    }
  }),
  movieDetail: (id) => httpClient.get(`/movie/${id}`, {
    params: {
      ...defaultParams,
    }
  })
}
