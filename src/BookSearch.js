import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class BookSearch extends Component {
	state={
		query: '',
		showingBooks: []
	}
	updateQuery = (query) => {
		this.setState({query : query.trim() })
		if(query){
			BooksAPI.search(query).then((books)=>{
				if (books.length > 0){
    		      books.map(book => (this.props.books.filter((data) => data.id === book.id).map((data) => book.shelf = data.shelf)))
		
    		      this.setState({showingBooks: books })
		
    		    } else {
    		      this.setState({showingBooks: []})
    		    }
    		  })
    		} else this.setState({showingBooks: []})
  	}

	bookShelfChange = (book, shelf) => {
		this.props.onBookUpdate(book, shelf)
	} 
	render(){
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
              
                <input type="text" 
                	   placeholder="Search by title or author"
                	   value={this.state.query}
                	   onChange={(event)=>this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              	{ this.state.showingBooks.length > 0 &&
              		this.state.showingBooks.map((book) =>(
                        <Book key={book.id} book={book} onChangeShelf={(book, shelf) => this.bookShelfChange(book, shelf)}/>))}
              </ol>
            </div>
          </div>
			)
	}
}

export default BookSearch;