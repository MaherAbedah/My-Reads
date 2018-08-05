import React, { Component } from 'react'


class Book extends Component{
	state = {
		shelf: 'none'
	}

	componentDidMount() {
    if(this.props.book.shelf) {
      this.setState({ shelf: this.props.book.shelf })
    }
  }

  bookShelfChange = (event) => {
    this.setState({
      shelf: event.target.value
    })
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

	render(){
		return (
			<li>
      			<div className="book">
      			  <div className="book-top">
      			    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.book.imageLinks?  `url(${this.props.book.imageLinks.smallThumbnail})` : ''  }}></div>
      			    <div className="book-shelf-changer">
      			      <select onChange={this.bookShelfChange} value={this.state.shelf}>
      			        <option value="move" disabled>Move to...</option>
      			        <option value="currentlyReading">Currently Reading
      			        </option>
      			        <option value="wantToRead">Want to Read</option>
      			        <option value="read">Read</option>
      			        <option value="none">None</option>
      			      </select>
      			    </div>
      			  </div>
      			  <div className="book-title">{this.props.book.title}</div>
      			  <div className="book-authors">
      			    {this.props.book.authors ? this.props.book.authors.toString() : ' '}</div>
      			</div>
    		</li>
    	)
	}
}


export default Book