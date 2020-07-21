import axios from 'axios'
import {getId} from '../reducers/anecdoteReducer'
const baseURL = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const res = await axios.get(baseURL)
  return res.data
}
const createNew = async(anecdote)=>{
  const newObject = {
    content: anecdote,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(baseURL, newObject)
  return res.data
}
const update = async(id, updatedObj) => {
  const res = await axios.put(`${baseURL}/${id}`, updatedObj)
  return res.data
}

export default {getAll, createNew, update}
