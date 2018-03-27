import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BookUI } from "./BookUI";
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input';

class SearchUI extends Component {

    render() {
        return (
            <div className="search-books">
                {this.searchBar()}
                {this.props.isValid(this.props.books) && this.searchResultBookShelf(this.props.bookShelfChanger)}
            </div>
        );
    }

    searchBar = () => (
        <div className="search-books-bar">
            <Link to='/' className='close-search' onClick={() => this.props.clearQuery()}>Close</Link>
            <div className="search-books-input-wrapper">
                <DebounceInput minLength={1} debounceTimeout={800}
                    onChange={event => this.props.updateQuery(event.target.value)} />
            </div>
        </div>
    )

    searchResultBookShelf = (bookShelfChanger) => (
        <div className="search-books-results">
            <ol className="books-grid">
                { this.props.books.map( book => 
                    <li key={book.id}> 
                        <BookUI book={book} shelves={this.props.shelves} bookShelfChanger={bookShelfChanger} /> 
                    </li> ) }
            </ol>
        </div>
    );

}

export default SearchUI