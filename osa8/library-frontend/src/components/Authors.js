
import React, {useState} from 'react'
import {useQuery,useMutation} from '@apollo/client'
import {ALL_AUTHORS,  EDIT_BORN} from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBorn] = useMutation(EDIT_BORN)
  const res = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  if (res.loading)  {
    return <div>loading...</div>
  }
  const authors = res.data.allAuthors

  if (!props.show) {
    return null
  }
  const update = async(event) =>{
    console.log(name, born);
    event.preventDefault()
    changeBorn({variables: {name, setBornTo: Number(born)}})
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={update}>
          <select value={name} onChange={({target}) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          <div>born<input value={born} onChange={({target}) => setBorn(target.value)}/></div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
