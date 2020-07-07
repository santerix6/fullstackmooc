import axios from 'axios'
const baseUrl = '/api/login'

const login = async credens => {
  const res = await axios.post(baseUrl, credens)
  return res.data
}

export default {login}
