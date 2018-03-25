import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchUI from "./SearchUI";
import {MainUI} from "./MainUI";


class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        shelves: {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want To Read",
            "read": "Read"
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(
            books => this.setState({books})
        ).catch (
            e => console.log(e)
        )
    }

    flipShowSearchPageBoolean = () => { this.state.showSearchPage ? 
        this.setState({showSearchPage: false}) :  this.setState({showSearchPage: true}); 
    }

    bookShelfChanger = (bookId, shelf) => {

        let book = this.getBookInState(bookId);

        if ( this.isValid(book) )  {
            BooksAPI.update(book, shelf);
            book.shelf = shelf;
            this.updateExistingBookInState(book);
        } else {
            BooksAPI.get(bookId).then( book => {
                book.shelf = shelf;
                this.addNewBookToState(book);
                BooksAPI.update(book, shelf);
            }).catch( e => {console.log(e)} );
        }
    }

    getBookInState = (bookId) => {
        return this.state.books.find( el => el.id === bookId );
    }

    addNewBookToState = (book) => {
        book = this.isValid(book) ? book : [];
        this.setState( state => { state.books.concat([ book ]) })
    }

    updateExistingBookInState = (book) => {
        this.setState( state => {
            state.books.map( el => el.id === book.id ? book : el ) } )
    }

    isValid = (object) => {
        return (!!object);
    }

    render() {
        return (
            <div className="app">
            {this.state.showSearchPage ? (
                <SearchUI shelves={this.state.shelves} flipSearchBoolean={this.flipShowSearchPageBoolean} />
            ) : (
                <MainUI 
                    shelves={this.state.shelves} 
                    books={this.state.books} 
                    bookShelfChanger={this.bookShelfChanger}
                    flipSearchBoolean={this.flipShowSearchPageBoolean} 
                />
            )}
            </div>
        )
    }

}

export default BooksApp
