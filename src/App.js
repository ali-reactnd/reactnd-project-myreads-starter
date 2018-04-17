import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchUI from "./SearchUI"
import { MainUI } from "./MainUI"
import { Route } from 'react-router-dom'
import { findBook } from './Utility'

class BooksApp extends React.Component {
    state = {
        booksOnShelves: [],
        shelves: {
            "currentlyReading": "Currently Reading",
            "wantToRead": "Want To Read",
            "read": "Read"
        },
        booksMatchQuery: [],
        query: ""
    }

    componentDidMount() {
        BooksAPI.getAll().then(
            books => this.setState({booksOnShelves: books})
        ).catch (
            e => console.log(e)
        )
    }

    bookShelfChanger = (bookId, shelf) => {

        let bookOnShelf = findBook(bookId, this.state.booksOnShelves)
        if (this.isValid(bookOnShelf)){
            this.updateBookOnShelf(bookOnShelf, shelf);
        }

        let bookInSearch = findBook(bookId, this.state.booksMatchQuery)
        if (this.isValid(bookInSearch)){
            this.updateBookAmongSearchResult(bookInSearch,shelf);
            if (!this.isValid(bookOnShelf)) this.putNewBookOnShelf(bookInSearch);
        }
        
        let book = this.isValid(bookOnShelf) ? bookOnShelf : bookInSearch;
        BooksAPI.update(book, shelf);
    }

    putNewBookOnShelf = (book) => {
        book = this.isValid(book) ? book : [];
        this.setState( state => ({ booksOnShelves: state.booksOnShelves.concat([ book ]) }))
    }

    updateBookOnShelf = (book, shelf) => {
        book.shelf = shelf;
        this.setState( state => ({
            booksOnShelves: state.booksOnShelves.map( el => el.id === book.id ? book : el ) } ))
    }

    updateBookAmongSearchResult = (book, shelf) => {
        book.shelf = shelf;
        this.setState( state => ({
            booksMatchQuery: state.booksMatchQuery.map( el => el.id === book.id ? book : el ) } ))
    }

    isValid = (object) => {
        return (!!object);
    }

    
    updateQuery = (query) => {
        if (this.isValid(query)) {
            this.setState({query});
            this.findBooksUsingBookAPI(query);
        } else { 
            this.clearQuery();
        }
    }

    findBooksUsingBookAPI = (query) => {
        BooksAPI.search(query).then( 
            books => {
                this.setState({booksMatchQuery: this.checkAgainstBooksOnShelf(books)});
            }
        ).catch(e => console.log(e));
    }

    checkAgainstBooksOnShelf = (books) => {
        return (!this.isValid(books)) ? [] : 
            books.map( book => {
                let b = findBook(book.id, this.state.booksOnShelves);
                return this.isValid(b) ? b : book;
            });
    }
    
    clearQuery = () => {
        this.setState({ query: "", booksMatchQuery: [] })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <MainUI 
                        shelves={this.state.shelves} 
                        books={this.state.booksOnShelves} 
                        bookShelfChanger={this.bookShelfChanger}
                        isValid={this.isValid}
                    />
                )} />

                <Route path='/search' render={ ({ history }) => (
                    <SearchUI 
                        query={this.state.query}
                        books={this.state.booksMatchQuery}
                        updateQuery={this.updateQuery}
                        clearQuery={this.clearQuery}
                        shelves={this.state.shelves} 
                        bookShelfChanger={this.bookShelfChanger}
                        isValid={this.isValid}
                    />
                )}/>
            </div>
        )
    }

}

export default BooksApp
