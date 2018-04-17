import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchUI from "./SearchUI"
import { MainUI } from "./MainUI"
import { Route } from 'react-router-dom'
import { findBook, isValid, updateBook } from './Utility'

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
        if (isValid(bookOnShelf)){
            this.setState( state => ({
                booksOnShelves: updateBook(bookOnShelf, shelf, this.state.booksOnShelves)}))
        }

        let bookInSearch = findBook(bookId, this.state.booksMatchQuery)
        if (isValid(bookInSearch)){
            this.setState( state => ({
                booksMatchQuery: updateBook(bookInSearch, shelf, this.state.booksMatchQuery)}))
            if (!isValid(bookOnShelf)) this.putNewBookOnShelf(bookInSearch);
        }
        
        let book = isValid(bookOnShelf) ? bookOnShelf : bookInSearch;
        BooksAPI.update(book, shelf);
    }

    putNewBookOnShelf = (book) => {
        book = isValid(book) ? book : [];
        this.setState( state => ({ booksOnShelves: state.booksOnShelves.concat([ book ]) }))
    }
    
    updateQuery = (query) => {
        if (isValid(query)) {
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
        return (!isValid(books)) ? [] : 
            books.map( book => {
                let b = findBook(book.id, this.state.booksOnShelves);
                return isValid(b) ? b : book;
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
                        isValid={isValid}
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
                        isValid={isValid}
                    />
                )}/>
            </div>
        )
    }

}

export default BooksApp
