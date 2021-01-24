import axios from 'axios'

export const defaultParams = {
  api_key: process.env.NEXT_PUBLIC_MOVIEDB_API_KEY,
  language: 'en-US'
}

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_MOVIEDB_BASE_URL}/3/`,
  timeout: 5000,
})

export default instance
