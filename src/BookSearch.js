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
	}
	render(){
		
		if(this.state.query){
			BooksAPI.search(this.state.query).then((showingBooks)=>{
				this.setState({
					showingBooks: showingBooks
				})
			})
		}

		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                	   placeholder="Search by title or author"
                	   value={this.state.query}
                	   onChange={(event)=>this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              	{ this.state.showingBooks.length > 0 &&
              		this.state.showingBooks.map((book) =>
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks?  `url(${book.imageLinks.smallThumbnail})` : '' }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors ? book.authors.toString() : ''}</div>
                        </div>
                      </li>)}
              </ol>
            </div>
          </div>
			)
	}
}

export default BookSearch;