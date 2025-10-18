import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    console.log('发送请求:', config.url)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('请求失败:', error)
    return Promise.reject(error)
  }
)

// 生成旅行计划
export const generateTravelPlan = (data) => {
  return api.post('/api/generate_plan', data)
}

// 测试天气API
export const testWeatherAPI = (city) => {
  return api.get(`/api/test/weather/${city}`)
}

// 测试景点API
export const testAttractionsAPI = (city) => {
  return api.get(`/api/test/attractions/${city}`)
}

// 获取API信息
export const getAPIInfo = () => {
  return api.get('/api/info')
}

// 健康检查
export const healthCheck = () => {
  return api.get('/health')
}

export default api