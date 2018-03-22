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
                <div>
                    <Shelf books={props.books} />
                    <Shelf books={props.books} />
                    <Shelf books={props.books} />
                </div>
            </div>
            <div className="open-search">
                <a onClick={() => props.flipSearchBoolean()}>Add a book</a>
            </div>
        </div>
    );
}