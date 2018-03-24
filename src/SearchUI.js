import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {BookUI} from "./BookUI";
import DebounceInput from 'react-debounce-input';

class SearchUI extends Component {

    state ={
        books: [],
        query: ""
    }

    updateQuery = (query) => {
        this.setState({query});
        console.log(this.state.query);
    }

    render() {
        return (
            <div className="search-books">
                {this.searchBar()}
                {this.searchResultBookShelf()}
            </div>
        );
    }

    searchBar = () => (
        <div className="search-books-bar">
            <a className="close-search" onClick={() => this.props.flipSearchBoolean()}>Close</a>
            <div className="search-books-input-wrapper">
                <DebounceInput minLength={1} debounceTimeout={800}
                    onChange={event => this.updateQuery(event.target.value)} />
            </div>
        </div>
    )

    searchResultBookShelf = () => (
        <div className="search-books-results">
            <ol className="books-grid">
                { this.state.books.map( book => <li key={book.id}> <BookUI book={book} /> </li> ) }
            </ol>
        </div>
    );

}

export default SearchUI