import React from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'


const Books = (props) => {
  const res = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  if (res.loading)  {
    return <div>loading...</div>
  }
  const books = res.data.allBooks
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books