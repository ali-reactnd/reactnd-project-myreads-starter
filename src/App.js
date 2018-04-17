import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchUI from "./SearchUI"
import { MainUI } from "./MainUI"
import { Route } from 'react-router-dom'
import { findBook, isValid, updateBook, addBook, findAndMatch } from './Utility'

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

        let updatedBooksOnShelves = this.updateBookShelf(bookId, shelf, 'booksOnShelves')
        let updatedBooksMatchQuery = this.updateBookShelf(bookId, shelf, 'booksMatchQuery')

        let bookArrayName = updatedBooksOnShelves ? 'booksOnShelves' : 'booksMatchQuery'
        let book = findBook(bookId, this.state[bookArrayName])
        BooksAPI.update(book, shelf);

        if (updatedBooksMatchQuery && !updatedBooksOnShelves)  {
            this.setState( state => ({
                booksOnShelves: addBook(book, this.state.booksOnShelves)}))
        }
    }
    
    updateBookShelf = (bookId, shelf, bookArrayName) => {
        let book = findBook(bookId, this.state[bookArrayName])
        if (isValid(book)){
            this.setState( state => ({
                [bookArrayName]: updateBook(book, shelf, this.state[bookArrayName])}))
                return true;
        }
        return false;
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
                this.setState({booksMatchQuery: findAndMatch(books, this.state.booksOnShelves)});
            }
        ).catch(e => console.log(e));
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
