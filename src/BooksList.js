import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class BooksList extends Component{
	state={
		shelf: 'none'
	}

	componentDidMount(){
		this.props.books.map((book)=> {
			if(book.shelf){
				this.setState({
					shelf : book.shelf
				})
			}
		})
	}
	updateShelf = (book, shelf) => {
		this.props.onShelfupdate(book,shelf)
	}

	bookShelfChange = (event) => {

		this.setState({
			shelf: event.target.value
		})
		let thisBook= event.target.parentElement.parentElement.parentElement.parentElement;
		console.log(thisBook);
		this.updateShelf(thisBook, event.target.value);

	}
	
	render(){
		return(
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.filter(book => book.shelf ==='currentlyReading').map((book) =>
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks?  `url(${book.imageLinks.smallThumbnail})` : ''  }}></div>
                            <div className="book-shelf-changer">
                              <select onChange = {this.bookShelfChange} value={this.state.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors ? book.authors.toString():''}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter(book => book.shelf ==='wantToRead').map((book) =>
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks?  `url(${book.imageLinks.smallThumbnail})` : ''  }}></div>
                            <div className="book-shelf-changer">
                              <select onChange = {this.bookShelfChange} value={this.state.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors ? book.authors.toString():''}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.filter(book => book.shelf ==='read').map((book) =>
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks?  `url(${book.imageLinks.smallThumbnail})` : ''  }}></div>
                            <div className="book-shelf-changer">
                              <select onChange = {this.bookShelfChange} value={this.state.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors ? book.authors.toString():''}</div>
                        </div>
                      </li>)}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        
			)
	}
}

export default BooksList;