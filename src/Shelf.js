import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {BookUI} from "./BookUI";

export const Shelf = (props) => (
    <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            <li>
            <BookUI />
            </li>
            <li>
            <BookUI />
            </li>
        </ol>
    </div>
</div>
);