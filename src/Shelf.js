import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {BookUI} from "./BookUI";

export const Shelf = (props) => (
    <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {
                props.books.map(
                    book => {
                        <li>book</li>
                    }
                )
            }
        </ol>
    </div>
</div>
);