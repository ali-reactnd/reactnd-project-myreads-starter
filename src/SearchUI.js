import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
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
        this.getBooksFromBookAPI();
    }

    getBooksFromBookAPI = () => {
        BooksAPI.search(this.state.query).then( 
            books => {
                this.setState({books});
                this.setDefaultShelf();
            }
        ).catch(e => console.log(e));
    }

    setDefaultShelf = () => {
        let books = this.state.books.map(
            book => this.isBookAmongOurShelves(book) ? book : this.setBookShelfToNone(book) 
        );
        this.setState({books});
    }

    isBookAmongOurShelves = (book) => {
        Object.keys(this.props.shelves).some( shelf => book.shelf===shelf )
    }

    setBookShelfToNone = (book) => {
        book.shelf = 'none';
        return book;
    }


    render() {
        return (
            <div className="search-books">
                {this.searchBar()}
                {!!this.state.books && this.searchResultBookShelf(this.props.bookShelfChanger)}
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

    searchResultBookShelf = (bookShelfChanger) => (
        <div className="search-books-results">
            <ol className="books-grid">
                { this.state.books.map( book => 
                    <li key={book.id}> <BookUI book={book} bookShelfChanger={bookShelfChanger} /> </li> ) }
            </ol>
        </div>
    );

}

export default SearchUI