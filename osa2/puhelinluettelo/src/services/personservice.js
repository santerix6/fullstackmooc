import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseurl)
  return request.then(response => response.data)
}
const newPerson = (newPerson) => {
  const request = axios.post(baseurl, newPerson)
  return request.then(response => response.data)
}
const deletePerson = (id) => {
  const request = axios.delete(baseurl+'/'+id)
  return request.then(response => request.data)
}
export default {
  getAll : getAll,
  newPerson : newPerson,
  deletePerson : deletePerson
}
