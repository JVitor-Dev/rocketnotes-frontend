import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rocketnotes-api-z5tt.onrender.com'
})
