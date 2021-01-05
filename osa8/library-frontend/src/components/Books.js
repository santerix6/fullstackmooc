import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'


const Books = (props) => {
  const [genre, setGenre] = useState('allgenres')
  const res = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  if (res.loading)  {
    return <div>loading...</div>
  }
  console.log(res);
  const books = res.data.allBooks
  const genress = []
  if (!props.show) {
    return null
  }
  for(var x of books){
    for(var y of x.genres) {
      if(genress.includes(y) === false){
        genress.push(y)
      }
    }
  }
  genress.push("allgenres")
  console.log(genress);
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
          {genre==="allgenres" ?
            books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
            :
            null
          }
          {books.map(a =>
            a.genres.includes(genre)?
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            :
            null
          )}
        </tbody>
      </table>
      {genress.map(x =>
        <button onClick={() => setGenre(x)} key={x}>{x}</button>
      )}
    </div>
  )
}

export default Books
