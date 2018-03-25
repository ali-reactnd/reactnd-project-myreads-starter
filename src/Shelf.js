import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {BookUI} from "./BookUI";

export const Shelf = (props) => (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfTitle}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {props.books.filter( book => book.shelf===props.shelfKey ).map( book => 
                <li key={book.id}> 
                    <BookUI book={book} shelves={props.shelves} bookShelfChanger={props.bookShelfChanger} /> 
                </li>
            )}
        </ol>
    </div>
</div>
);