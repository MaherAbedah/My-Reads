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
      let myBooks;
      if (this.state.books.findIndex(b => b.id === book.id) > 0) {
        // change the position of an existing book in the shelf
        myBooks = this.state.books.map(b => {
          if (b.id === book.id) {
            return {...book, shelf}
          } else {
            return b
          }
        })
      } else {
        // add a new book to the shelf
        myBooks = [...this.state.books, {...book, shelf}]
      }
  
      this.setState({books: myBooks})
      //to update the shelf on the server
      BooksAPI.update(book, shelf).then((data) => {

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
          <BookSearch onBookUpdate={(book, shelf) => this.shelfUpdate(book,shelf)} books={this.state.books} />
        )}/>
        <Route exact path='/' render={()=>(
          <BooksList onShelfUpdate={(book, shelf) => this.shelfUpdate(book,shelf)} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
