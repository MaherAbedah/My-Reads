import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  shelfUpdate = (book, shelf) => {
      let books;
      if (this.state.books.findIndex(b => b.id === book.id) > 0) {
        // change the position of an existing book in the shelf
        books = this.state.books.map(b => {
          if (b.id === book.id) {
            return {...book, shelf}
          } else {
            return b
          }
        })
      } else {
        // add a new book to the shelf
        books = [...this.state.books, {...book, shelf}]
      }
  
      this.setState({books})
  
      BooksAPI.update(book, shelf).then((data) => {
        // shelf updated on the server
      })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({
        books : books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <BookSearch onBookUpdate={(book, shelf) => this.shelfUpdate(book,shelf)} />
        )}/>
        <Route exact path='/' render={()=>(
          <BooksList onShelfUpdate={(book, shelf) => this.shelfUpdate(book,shelf)} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
