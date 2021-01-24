export function transformMoviesFromApi(movies) {
  const data = [...movies].map((movie) => {
    const {
      id,
      genre_ids,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      original_title
    } = movie

    return {
      id,
      genre_ids,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      original_title
    }
  })

  return data
}


export function transformMovieDetail(movie) {
  const {
      id,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      original_title
  } = movie

  return {
    id,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    original_title
  }
}
