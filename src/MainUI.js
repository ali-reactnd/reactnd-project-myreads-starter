import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Shelf} from "./Shelf";

export const MainUI = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div> {Object.keys(props.shelves).map(
                            (shelfKey, index) => 
                            <Shelf 
                                key={index} 
                                shelfKey={shelfKey} 
                                shelfTitle={props.shelves[shelfKey]}
                                shelves={props.shelves} 
                                books={props.books}
                                bookShelfChanger={props.bookShelfChanger} 
                            />
                )} </div>
            </div>
            <div className="open-search">
                <a onClick={() => props.flipSearchBoolean()}>Add a book</a>
            </div>
        </div>
    );
}