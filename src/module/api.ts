import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_PATH,
  timeout: 50000,
})

const api = {}

