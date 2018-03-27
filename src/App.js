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
        let book = this.findBookOnShelf(bookId);

        if ( this.isValid(book) )  {
            BooksAPI.update(book, shelf);
            book.shelf = shelf;
            this.updateBookOnShelf(book);
        } else {
            BooksAPI.get(bookId).then( book => {
                book.shelf = shelf;
                this.putNewBookOnShelf(book);
                BooksAPI.update(book, shelf);
            }).catch( e => {console.log(e)} );
        }
    }

    findBookOnShelf = (bookId) => {
        return this.state.booksOnShelves.find( el => el.id === bookId );
    }

    putNewBookOnShelf = (book) => {
        book = this.isValid(book) ? book : [];
        this.setState( state => ({ booksOnShelves: state.booksOnShelves.concat([ book ]) }))
    }

    updateBookOnShelf = (book) => {
        this.setState( state => {
            state.booksOnShelves.map( el => el.id === book.id ? book : el ) } )
    }

    isValid = (object) => {
        return (!!object);
    }

    
    updateQuery = (query) => {
        this.setState({query});
        this.findBooksUsingBookAPI();
    }

    findBooksUsingBookAPI = () => {
        BooksAPI.search(this.state.query).then( 
            books => {
                this.setState({booksMatchQuery: this.checkAgainstBooksOnShelf(books)});
            }
        ).catch(e => console.log(e));
    }

    checkAgainstBooksOnShelf = (books) => {
        return books.map( book => {
            let b = this.findBookOnShelf(book.id);
            return this.isValid(b) ? b : book;
        });
    }
    
    clearQuery = () => {
        this.setState({ query: "" })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <MainUI 
                        shelves={this.state.shelves} 
                        books={this.state.booksOnShelves} 
                        bookShelfChanger={this.bookShelfChanger}
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
