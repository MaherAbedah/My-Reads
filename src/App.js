import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelf: ''
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({
        books : books
      })
      console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <BookSearch onShelfupdate={()=>{}} />
        )}/>
        <Route exact path='/' render={()=>(
          <BooksList onShelfupdate={()=>{}} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
