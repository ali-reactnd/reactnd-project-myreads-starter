import React from 'react'
import './App.css'
import {BookUI} from "./BookUI"
import PropTypes from 'prop-types'

export const Shelf = (props) => (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelves[props.shelfKey]}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {props.books.filter( book => book.shelf===props.shelfKey ).map( book => 
                <li key={book.id}> 
                    <BookUI book={book} shelves={props.shelves} 
                        bookShelfChanger={props.bookShelfChanger} isValid={props.isValid}/> 
                </li>
            )}
        </ol>
    </div>
</div>
);

Shelf.propTypes = {
    shelfKey: PropTypes.string.isRequired,
    shelves: PropTypes.object.isRequired, 
    books: PropTypes.array.isRequired,
    bookShelfChanger: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
}