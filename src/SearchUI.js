import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { BookUI } from "./BookUI";
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input';

class SearchUI extends Component {

    state ={
        booksMatchQuery: [],
        query: ""
    }

    updateQuery = (query) => {
        this.setState({query});
        this.getBooksFromBookAPI();
    }

    getBooksFromBookAPI = () => {
        BooksAPI.search(this.state.query).then( 
            books => {
                this.setState({booksMatchQuery: this.checkAgainsUserLibrary(books)});
                // this.setDefaultShelf();
            }
        ).catch(e => console.log(e));
    }

    checkAgainsUserLibrary = (books) => {
        return books.map( book => {
            let b = this.props.getBookInState(book.id);
            return this.props.isValid(b) ? b : book;
        });
    }
    
    clearQuery = () => {
        this.setState({ query: "" })
    }

    render() {
        return (
            <div className="search-books">
                {this.searchBar()}
                {!!this.state.booksMatchQuery && this.searchResultBookShelf(this.props.bookShelfChanger)}
            </div>
        );
    }

    searchBar = () => (
        <div className="search-books-bar">
            <Link to='/' className='close-search' onClick={() => this.clearQuery()}>Close</Link>
            <div className="search-books-input-wrapper">
                <DebounceInput minLength={1} debounceTimeout={800}
                    onChange={event => this.updateQuery(event.target.value)} />
            </div>
        </div>
    )

    searchResultBookShelf = (bookShelfChanger) => (
        <div className="search-books-results">
            <ol className="books-grid">
                { this.state.booksMatchQuery.map( book => 
                    <li key={book.id}> 
                        <BookUI book={book} shelves={this.props.shelves} bookShelfChanger={bookShelfChanger} /> 
                    </li> ) }
            </ol>
        </div>
    );

}

export default SearchUI