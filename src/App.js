import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchUI from "./SearchUI";
import { MainUI } from "./MainUI";
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
    state = {
        booksOnShelves: [],
        shelves: {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want To Read",
            "read": "Read"
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(
            books => this.setState({booksOnShelves: books})
        ).catch (
            e => console.log(e)
        )
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
        return this.state.booksOnShelves.find( el => el.id === bookId );
    }

    addNewBookToState = (book) => {
        book = this.isValid(book) ? book : [];
        this.setState( state => ({ booksOnShelves: state.booksOnShelves.concat([ book ]) }))
    }

    updateExistingBookInState = (book) => {
        this.setState( state => {
            state.booksOnShelves.map( el => el.id === book.id ? book : el ) } )
    }

    isValid = (object) => {
        return (!!object);
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <MainUI 
                        shelves={this.state.shelves} 
                        books={this.state.booksOnShelves} 
                        bookShelfChanger={this.bookShelfChanger}
                        flipSearchBoolean={this.flipShowSearchPageBoolean} 
                    />
                )} />

                <Route path='/search' render={ ({ history }) => (
                    <SearchUI 
                        shelves={this.state.shelves} 
                        bookShelfChanger={this.bookShelfChanger}
                        flipSearchBoolean={this.flipShowSearchPageBoolean} 
                        getBookInState={this.getBookInState}
                        isValid={this.isValid}
                    />
                )}/>
            </div>
        )
    }

}

export default BooksApp
