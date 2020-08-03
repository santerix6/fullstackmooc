import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () =>{
  const res = await axios.get(baseUrl)
  console.log('aaa',res.data);
  return res.data
}

export default {getAll}
