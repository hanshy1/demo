import axios from 'axios'
import apiDef from './apiDef'

const api = {}

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_PATH,
  timeout: 50000,
})

apiDef.forEach(item => {
  api[item.name] = async function(params: any, data: any) {
    let path = item.path
    for (const param of item.params) {
      if (param in params) {
        path = path.replace(`{${param}}`, params[param])
      } else {
        //console.error(`Path parameter "${param}" does not exist.`)
        return Promise.reject(`Path parameter "${param}" does not exist.`)
      }
    }
    
    return instance({
      method: item.method,
      url: path,
      data: data,
      headers: {
        'Authorization': ''
      }
    }).then(res => {
      return Promise.resolve(res.data)
    }).catch(err => {
      return Promise.reject(err)
    })

  }
})

export default api
